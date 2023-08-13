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
exports.materialesController = void 0;
const database_1 = require("../database");
class MaterialesController {
    getMateriales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_materiales');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener materiales:', error);
                    res.status(500).json({ error: 'Error al obtener matyerial', details: error.message });
                }
                else {
                    console.error('Error al obtener producto:', error);
                    res.status(500).json({ error: 'Error al obtener producto' });
                }
            }
        });
    }
    getByMateriales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_material } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_materiales WHERE id_material = ?', [id_material]);
            res.json(result[0]);
        });
    }
    createMateriales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_materiales SET ?', [req.body]);
            res.json({ message: 'material Guardado' });
        });
    }
    updateMateriales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_material } = req.params;
                yield database_1.pool.query('UPDATE tb_materiales SET ? WHERE id_material = ?', [req.body, id_material]);
                res.json({ message: 'material Actualizado' });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener material:', error);
                    res.status(500).json({ error: 'Error al obtener material', details: error.message });
                }
                else {
                    console.error('Error al obtener material:', error);
                    res.status(500).json({ error: 'Error al obtener material' });
                }
            }
        });
    }
    deleteMateriales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_material } = req.params;
            yield database_1.pool.query('DELETE FROM tb_materiales WHERE id_material = ?', [id_material]);
            res.json({ message: 'material Eliminado' });
        });
    }
}
exports.materialesController = new MaterialesController();
