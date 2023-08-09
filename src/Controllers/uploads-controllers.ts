import { Request, Response } from "express";
import { pool } from "../database";

class UploadsController{

  async createPhoto(req: Request, res: Response){

    console.log('Guardando Foto')
    console.log(req.body)
    
    return res.json({
      message: 'Imagen Subida Correctamente'
    })
  }

  async getPhoto(req: Request, res: Response){
``
  }
}

export const uploadsController = new UploadsController();