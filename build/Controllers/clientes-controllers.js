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
class clientesController {
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_clientes');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener clientes:', error);
                    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
                }
                else {
                    console.error('Error al obtener clientes:', error);
                    res.status(500).json({ error: 'Error al obtener clientes' });
                }
            }
        });
    }
    getByClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
            res.json(result[0]);
        });
    }
    createClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_clientes SET ?', [req.body]);
            res.json({ message: 'Cliente Guardado' });
        });
    }
    updateClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            yield database_1.pool.query('UPDATE tb_clientes SET ? WHERE id_cliente = ?', [req.body, id_cliente]);
            res.json({ message: 'Cliente Actualizado' });
        });
    }
    deleteClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            yield database_1.pool.query('DELETE FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
            res.json({ message: 'Cliente Eliminado' });
        });
    }
}
exports.tiposController = new clientesController();
