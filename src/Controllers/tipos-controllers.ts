import { Request,Response } from "express";
import { pool } from "../database";

class TiposController{

    async getTipos(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_tipos');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener tipos:', error);
            res.status(500).json({ error: 'Error al obtener tipos', details: error.message });
          } else {
            console.error('Error al obtener tipos:', error);
            res.status(500).json({ error: 'Error al obtener tipos' });
          }
        }
      }

    async getByTipos (req:Request, res:Response){
        const {id_tipo} = req.params;
        const result = await pool.query('SELECT * FROM tb_tipos WHERE id_tipo = ?', [id_tipo]);
        res.json(result[0]);
    }

    async createTipos (req:Request, res:Response){
        await pool.query('INSERT INTO tb_tipos SET ?', [req.body]);
        res.json({message:'Tipo Guardado'});
    }



    async updateTipos (req:Request, res:Response){
        const {id_tipo} = req.params; 
        await pool.query('UPDATE tb_tipos SET ? WHERE id_tipo = ?', [req.body, id_tipo]);
        res.json({message:'Tipo Actualizado'});
    }
    
    async deleteTipos (req:Request, res:Response){
        const {id_tipo} = req.params; 
        await pool.query('DELETE FROM tb_tipos WHERE id_tipo = ?', [id_tipo]);
        res.json({message:'Tipo Eliminado'});
    }
}

export const tiposController = new TiposController();