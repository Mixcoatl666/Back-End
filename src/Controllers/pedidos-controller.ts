import { Request,Response } from "express";
import { pool } from "../database";

class PedidosController{

    async getPedidos(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_pedidos');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({ error: 'Error al obtener pedidos', details: error.message });
          } else {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({ error: 'Error al obtener pedidos' });
          }
        }
      }

    async getByPedidos (req:Request, res:Response){
        const {id_pedido} = req.params;
        const result = await pool.query('SELECT * FROM tb_pedidos WHERE id_pedido = ?', [id_pedido]);
        res.json(result[0]);
    }

    async createPedidos (req:Request, res:Response){
        await pool.query('INSERT INTO tb_pedidos SET ?', [req.body]);
        res.json({message:'Pedido Guardado'});
    }

    async updatePedidos (req:Request, res:Response){
        const {id_pedido} = req.params; 
        await pool.query('UPDATE tb_pedidos SET ? WHERE id_pedido = ?', [req.body, id_pedido]);
        res.json({message:'Pedido Actualizado'});
    }
    
    async deletePedidos (req:Request, res:Response){
        const {id_pedido} = req.params; 
        await pool.query('DELETE FROM tb_pedidos WHERE id_pedido = ?', [id_pedido]);
        res.json({message:'Pedido Eliminado'});
    }
}

export const pedidosController = new PedidosController();