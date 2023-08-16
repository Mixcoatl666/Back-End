import { Request,Response } from "express";
import { pool } from "../database";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

    async login(req: Request, res: Response) {
      const { correo, pass } = req.body;
      try {
        const result = await pool.query('SELECT * FROM tb_clientes WHERE correo = ? AND pass = ?', [correo, pass]);
        const rows = result[0] as RowDataPacket[];
        console.log('Correo: ' + correo);
        console.log('Pass: ' + pass);
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

    async registro(req: Request, res: Response) {
      const { nom_cliente, correo, direccion, telefono, rfc, pass } = req.body;
      try {
        // Verificar si ya existe un usuario con el mismo correo
        const existingUser = await pool.query('SELECT * FROM tb_clientes WHERE correo = ?', [correo]);
        const rows = existingUser[0] as RowDataPacket[];
        console.log('nom_cliente' + nom_cliente);
        console.log('Correo: ' + correo);
        console.log('direccion' + direccion);
        console.log('telefono' + telefono);
        console.log('rfc' + rfc);
        console.log('Pass: ' + pass);

        if (rows.length > 0) {
          res.status(409).json({ error: 'El correo ya está en uso' });
        } else {
          // Registrar al nuevo usuario
          await pool.query('INSERT INTO tb_clientes (nom_cliente, correo, direccion, telefono, rfc, pass) VALUES (?, ?, ?, ?, ?, ?)', [nom_cliente, correo, direccion, telefono, rfc, pass]);
          res.json({ message: 'Usuario registrado exitosamente' });
        }
      } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: 'Error en inicio de sesión' });
      }
    }
    
    
  
  
  
}

export const clientesController = new ClientesController();