import { Request,Response } from "express";
import { pool } from "../database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

    async login(req: Request, res: Response) {
      const { correo, clave } = req.body;
      try {
        const result = await pool.query('SELECT * FROM tb_usuarios WHERE correo = ? AND clave = ?', [correo, clave]);
        const rows = result[0] as RowDataPacket[];
        console.log('Correo: ' + correo);
        console.log('Pass: ' + clave);
        if (rows.length > 0) {
          // Usuario autenticado
          res.json({ message: 'Autenticación exitosa' });
        } else {
          res.status(401).json({ error: 'Datos incorrectos' });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en inicio de sesión:', error);
          res.status(500).json({ error: 'Error en inicio de sesión', details: error.message });
        } else {
          console.error('Error en inicio de sesión:', error);
          res.status(500).json({ error: 'Error en inicio de sesión' });
        }
      }
    }
}

export const usuariosController = new UsuariosController();