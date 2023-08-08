import { Request,Response } from "express";
import { pool } from "../database";

class ProveedoresController{

    async getProveedores(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_proveedores');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener proveedores:', error);
            res.status(500).json({ error: 'Error al obtener proveedores', details: error.message });
          } else {
            console.error('Error al obtener proveedores:', error);
            res.status(500).json({ error: 'Error al obtener proveedores' });
          }
        }
      }

    async getByIdProveedor (req:Request, res:Response){
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM tb_proveedores WHERE id_proveedor = ?', [id]);
        res.json(result[0]);
    }

    async createProveedores (req:Request, res:Response){
        await pool.query('INSERT INTO tb_proveedores SET ?', [req.body]);
        res.json({message:'Datos guardados'});
    }

    async deleteProveedor (req:Request, res:Response){
        const {id} = req.params; 
        await pool.query('DELETE FROM tb_proveedores WHERE id_proveedor = ?', [id]);
        res.json({message:'Proveedor Eliminado'});
    }

    async updateProveedor (req:Request, res:Response){
        const {id} = req.params; 
        await pool.query('UPDATE tb_proveedores SET ? WHERE id_proveedor = ?', [req.body, id]);
        res.json({message:'Datos actualizados'});
    }

}

export const proveedoresController = new ProveedoresController();