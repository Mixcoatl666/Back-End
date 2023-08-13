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
exports.productosController = void 0;
const database_1 = require("../database");
class ProductosController {
    getProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_productos');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener producto:', error);
                    res.status(500).json({ error: 'Error al obtener producto', details: error.message });
                }
                else {
                    console.error('Error al obtener producto:', error);
                    res.status(500).json({ error: 'Error al obtener producto' });
                }
            }
        });
    }
    getByProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_producto } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_productos WHERE id_producto = ?', [id_producto]);
            res.json(result[0]);
        });
    }
    createProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_productos SET ?', [req.body]);
            res.json({ message: 'Producto Guardado' });
        });
    }
    updateProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_producto } = req.params;
                yield database_1.pool.query('UPDATE tb_productos SET ? WHERE id_producto = ?', [req.body, id_producto]);
                res.json({ message: 'Producto Actualizado' });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener producto:', error);
                    res.status(500).json({ error: 'Error al obtener producto', details: error.message });
                }
                else {
                    console.error('Error al obtener producto:', error);
                    res.status(500).json({ error: 'Error al obtener producto' });
                }
            }
        });
    }
    deleteProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_producto } = req.params;
            yield database_1.pool.query('DELETE FROM tb_productos WHERE id_producto = ?', [id_producto]);
            res.json({ message: 'Producto Eliminado' });
        });
    }
}
exports.productosController = new ProductosController();
