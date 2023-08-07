"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidos_controller_1 = require("../Controllers/pedidos-controller");
class PedidosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', pedidos_controller_1.pedidosController.getPedidos);
        this.router.get('/:id_pedido', pedidos_controller_1.pedidosController.getByPedidos);
        this.router.post('/', pedidos_controller_1.pedidosController.createPedidos);
        this.router.delete('/:id_pedido', pedidos_controller_1.pedidosController.deletePedidos);
        this.router.put('/:id_pedido', pedidos_controller_1.pedidosController.updatePedidos);
    }
}
const pedidosRoutes = new PedidosRoutes();
exports.default = pedidosRoutes.router;
