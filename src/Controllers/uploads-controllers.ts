import { Request, Response } from "express";
import { pool } from "../database";
import fs from 'fs-extra';
import { RowDataPacket } from 'mysql2';

class UploadsController{

  async createPhoto(req: Request, res: Response) {
    const { title, description } = req.body;
  
    const newPhoto = {
      title: title,
      description: description,
      filePath: req.file?.path
    }
  
    try {
      const connection = await pool.getConnection(); // Obtener una conexión del pool
  
      // Realizar la inserción en la base de datos
      await connection.query('INSERT INTO tb_galeria (titulo, descripcion, imagenRuta) VALUES (?, ?, ?)', [newPhoto.title, newPhoto.description, newPhoto.filePath]);
  
      connection.release(); // Liberar la conexión
  
      return res.json({
        message: 'Imagen Subida Correctamente'
      });
    } catch (error) {
      console.error('Error al insertar en la base de datos:', error);
      return res.status(500).json({
        message: 'Error al subir la imagen'
      });
    }
  }
  
  async deletePhoto(req: Request, res: Response) {
    const { id } = req.params; // Get the ID of the photo to delete
  
    try {
      const connection = await pool.getConnection(); // Get a connection from the pool
  
      // Get the file path of the photo from the database
      const result = await connection.query('SELECT filePath FROM tb_galeria WHERE id = ?', [id]);
      const rows = result[0] as RowDataPacket[]; // Cast the result to RowDataPacket[] type
      if (rows.length === 0) {
        throw new Error('Photo not found'); // Handle case when no rows are returned
      }
      const filePath = rows[0].filePath;
  
      // Delete the photo from the folder
      fs.unlinkSync(filePath);
  
      // Delete the photo from the database
      await connection.query('DELETE FROM tb_galeria WHERE id = ?', [id]);
  
      connection.release(); // Release the connection
  
      return res.json({
        message: 'Imagen Eliminada Correctamente'
      });
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      return res.status(500).json({
        message: 'Error al eliminar la imagen'
      });
    }
  }
  
  

  async getPhoto(req:Request, res:Response) {
    try {
      const result = await pool.query('SELECT * FROM tb_galeria');
      res.json(result[0]);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al obtener la informacion:', error);
        res.status(500).json({ error: 'Error al obtener la informacion', details: error.message });
      } else {
        console.error('Error al obtener tipos:', error);
        res.status(500).json({ error: 'Error al obtener la informacion' });
      }
    }
  }

  async getByPhoto (req:Request, res:Response){
    const {id_imagen} = req.params;
    const result = await pool.query('SELECT * FROM tb_galeria WHERE id_imagen = ?', [id_imagen]);
    res.json(result[0]);
  }

  async updatePhoto (req:Request, res:Response){
    const {id_imagen} = req.params;
    await pool.query('UPDATE tb_galeria SET ? WHERE id_imagen', [req.body, id_imagen]);

  }

}

export const uploadsController = new UploadsController();