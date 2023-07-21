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
exports.tiposController = void 0;
const database_1 = require("../database");
class TiposController {
    getTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_tipos');
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
    getByTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tipo } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_tipos WHERE id_tipo = ?', [id_tipo]);
            res.json(result[0]);
        });
    }
    createTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_tipos SET ?', [req.body]);
            res.json({ message: 'Tipo Guardado' });
        });
    }
    deleteTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tipo } = req.params;
            yield database_1.pool.query('DELETE FROM tb_tipos WHERE id_tipo = ?', [id_tipo]);
            res.json({ message: 'Tipo Eliminado' });
        });
    }
    updateTipos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_tipo } = req.params;
            yield database_1.pool.query('UPDATE tb_tipos SET ? WHERE id_tipo = ?', [req.body, id_tipo]);
            res.json({ message: 'Tipo Actualizado' });
        });
    }
}
exports.tiposController = new TiposController();
