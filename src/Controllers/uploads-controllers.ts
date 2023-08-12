import { Request, Response } from "express";
import { pool } from "../database";

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
  
  async getPhoto(req:Request, res:Response) {
    try {
      const result = await pool.query('SELECT * FROM tb_galeria');
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

<<<<<<< Updated upstream
  async getByPhoto (req:Request, res:Response){
    const {id_imagen} = req.params;
    const result = await pool.query('SELECT * FROM tb_galeria WHERE id_imagen = ?', [id_imagen]);
    res.json(result[0]);
  }

  async updatePhoto (req:Request, res:Response){
    const {id_imagen} = req.params;
    await pool.query('UPDATE tb_galeria SET ? WHERE id_imagen', [req.body, id_imagen]);
=======
  async getPhoto(req: Request, res: Response){

>>>>>>> Stashed changes
  }
}

export const uploadsController = new UploadsController();