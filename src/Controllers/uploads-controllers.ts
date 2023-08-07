import { Request, Response } from "express";

export function uploadsController(req: Request, res: Response){


  return res.json({
    message: 'Imagen Subida Correctamente'
  })
}