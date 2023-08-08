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
exports.proveedoresController = void 0;
const database_1 = require("../database");
class ProveedoresController {
    getProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_proveedores');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener proveedores:', error);
                    res.status(500).json({ error: 'Error al obtener proveedores', details: error.message });
                }
                else {
                    console.error('Error al obtener proveedores:', error);
                    res.status(500).json({ error: 'Error al obtener proveedores' });
                }
            }
        });
    }
    getByIdProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_proveedores WHERE id_proveedor = ?', [id]);
            res.json(result[0]);
        });
    }
    createProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_proveedores SET ?', [req.body]);
            res.json({ message: 'Datos guardados' });
        });
    }
    deleteProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.pool.query('DELETE FROM tb_proveedores WHERE id_proveedor = ?', [id]);
            res.json({ message: 'Proveedor Eliminado' });
        });
    }
    updateProveedor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.pool.query('UPDATE tb_proveedores SET ? WHERE id_proveedor = ?', [req.body, id]);
            res.json({ message: 'Datos actualizados' });
        });
    }
}
exports.proveedoresController = new ProveedoresController();
