"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsController = void 0;
const database_1 = require("../database");
const fs_extra_1 = __importDefault(require("fs-extra"));
class UploadsController {
    createPhoto(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description } = req.body;
            const newPhoto = {
                title: title,
                description: description,
                filePath: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path
            };
            try {
                const connection = yield database_1.pool.getConnection(); // Obtener una conexión del pool
                // Realizar la inserción en la base de datos
                yield connection.query('INSERT INTO tb_galeria (titulo, descripcion, imagenRuta) VALUES (?, ?, ?)', [newPhoto.title, newPhoto.description, newPhoto.filePath]);
                connection.release(); // Liberar la conexión
                return res.json({
                    message: 'Imagen Subida Correctamente'
                });
            }
            catch (error) {
                console.error('Error al insertar en la base de datos:', error);
                return res.status(500).json({
                    message: 'Error al subir la imagen'
                });
            }
        });
    }
    deletePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; // Get the ID of the photo to delete
            try {
                const connection = yield database_1.pool.getConnection(); // Get a connection from the pool
                // Get the file path of the photo from the database
                const result = yield connection.query('SELECT filePath FROM tb_galeria WHERE id = ?', [id]);
                const rows = result[0]; // Cast the result to RowDataPacket[] type
                if (rows.length === 0) {
                    throw new Error('Photo not found'); // Handle case when no rows are returned
                }
                const filePath = rows[0].filePath;
                // Delete the photo from the folder
                fs_extra_1.default.unlinkSync(filePath);
                // Delete the photo from the database
                yield connection.query('DELETE FROM tb_galeria WHERE id = ?', [id]);
                connection.release(); // Release the connection
                return res.json({
                    message: 'Imagen Eliminada Correctamente'
                });
            }
            catch (error) {
                console.error('Error al eliminar la imagen:', error);
                return res.status(500).json({
                    message: 'Error al eliminar la imagen'
                });
            }
        });
    }
    getPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_galeria');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener la informacion:', error);
                    res.status(500).json({ error: 'Error al obtener la informacion', details: error.message });
                }
                else {
                    console.error('Error al obtener tipos:', error);
                    res.status(500).json({ error: 'Error al obtener la informacion' });
                }
            }
        });
    }
    getByPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_imagen } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_galeria WHERE id_imagen = ?', [id_imagen]);
            res.json(result[0]);
        });
    }
    updatePhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_imagen } = req.params;
            yield database_1.pool.query('UPDATE tb_galeria SET ? WHERE id_imagen', [req.body, id_imagen]);
        });
    }
}
exports.uploadsController = new UploadsController();
