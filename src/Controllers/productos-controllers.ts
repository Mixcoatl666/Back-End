import { Request,Response } from "express";
import { pool } from "../database";

class ProductosController{

    async getProductos(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_productos');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto', details: error.message });
          } else {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto' });
          }
        }
      }

    async getByProductos (req:Request, res:Response){
        const {id_producto} = req.params;
        const result = await pool.query('SELECT * FROM tb_productos WHERE id_producto = ?', [id_producto]);
        res.json(result[0]);
    }

    async createProductos (req:Request, res:Response){
        await pool.query('INSERT INTO tb_productos SET ?', [req.body]);
        res.json({message:'Producto Guardado'});
    }



    async updateProductos (req:Request, res:Response){
      try{ 
      const {id_producto} = req.params; 
        await pool.query('UPDATE tb_productos SET ? WHERE id_producto = ?', [req.body, id_producto]);
        res.json({message:'Producto Actualizado'});
      }catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto', details: error.message });
          } else {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto' });
          }
        }
      }
    
    async deleteProductos (req:Request, res:Response){
        const {id_producto} = req.params; 
        await pool.query('DELETE FROM tb_productos WHERE id_producto = ?', [id_producto]);
        res.json({message:'Producto Eliminado'});
    }
}

export const productosController = new ProductosController();