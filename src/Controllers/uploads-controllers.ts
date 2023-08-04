import { Request, Response } from "express";
import multer from "multer";

// Configuración de multer para guardar las imágenes en la carpeta "uploads"
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("image");

export const uploadImage = (req: Request, res: Response) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: "Imagen subida exitosamente" });
  });
};
