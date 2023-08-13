"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_controllers_1 = require("../Controllers/productos-controllers");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', productos_controllers_1.productosController.getProductos);
        this.router.get('/:id_producto', productos_controllers_1.productosController.getByProductos);
        this.router.post('/', productos_controllers_1.productosController.createProductos);
        this.router.delete('/:id_producto', productos_controllers_1.productosController.deleteProductos);
        this.router.put('/:id_producto', productos_controllers_1.productosController.updateProductos);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
