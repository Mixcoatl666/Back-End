import { Request,Response } from "express";
import { pool } from "../database";

class MaterialesController{

    async getMateriales(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_materiales');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener materiales:', error);
            res.status(500).json({ error: 'Error al obtener matyerial', details: error.message });
          } else {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ error: 'Error al obtener producto' });
          }
        }
      }

    async getByMateriales (req:Request, res:Response){
        const {id_material} = req.params;
        const result = await pool.query('SELECT * FROM tb_materiales WHERE id_material = ?', [id_material]);
        res.json(result[0]);
    }

    async createMateriales (req:Request, res:Response){
        await pool.query('INSERT INTO tb_materiales SET ?', [req.body]);
        res.json({message:'material Guardado'});
    }



    async updateMateriales (req:Request, res:Response){
      try{ 
      const {id_material} = req.params; 
        await pool.query('UPDATE tb_materiales SET ? WHERE id_material = ?', [req.body, id_material]);
        res.json({message:'material Actualizado'});
      }catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener material:', error);
            res.status(500).json({ error: 'Error al obtener material', details: error.message });
          } else {
            console.error('Error al obtener material:', error);
            res.status(500).json({ error: 'Error al obtener material' });
          }
        }
      }
    
    async deleteMateriales (req:Request, res:Response){
        const {id_material} = req.params; 
        await pool.query('DELETE FROM tb_materiales WHERE id_material = ?', [id_material]);
        res.json({message:'material Eliminado'});
    }
}

export const materialesController = new MaterialesController();