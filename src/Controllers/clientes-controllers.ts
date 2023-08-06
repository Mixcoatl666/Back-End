import { Request,Response } from "express";
import { pool } from "../database";

class ClientesController{

    async getClientes(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_clientes');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
          } else {
            console.error('Error al obtener clientes:', error);
            res.status(500).json({ error: 'Error al obtener clientes' });
          }
        }
      }

    async getByClientes (req:Request, res:Response){
        const {id_cliente} = req.params;
        const result = await pool.query('SELECT * FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
        res.json(result[0]);
    }

    async createClientes (req:Request, res:Response){
        await pool.query('INSERT INTO tb_clientes SET ?', [req.body]);
        res.json({message:'Cliente Guardado'});
    }



    async updateClientes (req:Request, res:Response){
        const {id_cliente} = req.params; 
        await pool.query('UPDATE tb_clientes SET ? WHERE id_cliente = ?', [req.body, id_cliente]);
        res.json({message:'Cliente Actualizado'});
    }
    
    async deleteClientes (req:Request, res:Response){
        const {id_cliente} = req.params; 
        await pool.query('DELETE FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
        res.json({message:'Cliente Eliminado'});
    }
}

export const clientesController = new ClientesController();