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
exports.pedidosController = void 0;
const database_1 = require("../database");
class PedidosController {
    getPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_pedidos');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener pedidos:', error);
                    res.status(500).json({ error: 'Error al obtener pedidos', details: error.message });
                }
                else {
                    console.error('Error al obtener pedidos:', error);
                    res.status(500).json({ error: 'Error al obtener pedidos' });
                }
            }
        });
    }
    getByPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_pedido } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_pedidos WHERE id_pedido = ?', [id_pedido]);
            res.json(result[0]);
        });
    }
    createPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_pedidos SET ?', [req.body]);
            res.json({ message: 'Pedido Guardado' });
        });
    }
    updatePedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_pedido } = req.params;
            yield database_1.pool.query('UPDATE tb_pedidos SET ? WHERE id_pedido = ?', [req.body, id_pedido]);
            res.json({ message: 'Pedido Actualizado' });
        });
    }
    deletePedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_pedido } = req.params;
            yield database_1.pool.query('DELETE FROM tb_pedidos WHERE id_pedido = ?', [id_pedido]);
            res.json({ message: 'Pedido Eliminado' });
        });
    }
}
exports.pedidosController = new PedidosController();
