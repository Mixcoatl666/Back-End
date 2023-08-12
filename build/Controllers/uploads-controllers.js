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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsController = void 0;
const database_1 = require("../database");
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
    getPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_galeria');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener tipos:', error);
                    res.status(500).json({ error: 'Error al obtener tipos', details: error.message });
                }
                else {
                    console.error('Error al obtener tipos:', error);
                    res.status(500).json({ error: 'Error al obtener tipos' });
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
