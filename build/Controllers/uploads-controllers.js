"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsController = void 0;
function uploadsController(req, res) {
    return res.json({
        message: 'Imagen Subida Correctamente'
    });
}
exports.uploadsController = uploadsController;

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
// Configuración de multer para guardar las imágenes en la carpeta "uploads"
const storage = multer_1.default.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage }).single("image");
const uploadImage = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: "Imagen subida exitosamente" });
    });
};
exports.uploadImage = uploadImage;