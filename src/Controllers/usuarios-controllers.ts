import { Request,Response } from "express";
import { pool } from "../database";

class UsuariosController{

    async getUsuarios(req:Request, res:Response) {
        try {
          const result = await pool.query('SELECT * FROM tb_usuarios');
          res.json(result[0]);
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
          } else {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ error: 'Error al obtener usuarios' });
          }
        }
      }

    async getByIdUsuario (req:Request, res:Response){
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM tb_usuarios WHERE id_usuario = ?', [id]);
        res.json(result[0]);
    }

    async createUsuarios (req:Request, res:Response){
        await pool.query('INSERT INTO tb_usuarios SET ?', [req.body]);
        res.json({message:'Usuario Guardado'});
    }

    async deleteUsuario (req:Request, res:Response){
        const {id} = req.params; 
        await pool.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id]);
        res.json({message:'Usuario Eliminado'});
    }

    async updateUsuario (req:Request, res:Response){
        const {id} = req.params; 
        await pool.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id]);
        res.json({message:'Usuario Actualizado'});
    }

}

export const usuariosController = new UsuariosController();