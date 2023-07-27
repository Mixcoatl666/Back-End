"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controllers_1 = require("../Controllers/clientes-controllers");
class ClientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', clientes_controllers_1.tiposController.getClientes);
        this.router.get('/:id_cliente', clientes_controllers_1.tiposController.getByClientes);
        this.router.post('/', clientes_controllers_1.tiposController.createClientes);
        this.router.delete('/:id_cliente', clientes_controllers_1.tiposController.deleteClientes);
        this.router.put('/:id_cliente', clientes_controllers_1.tiposController.updateClientes);
    }
}
const tiposRoutes = new ClientesRoutes();
exports.default = tiposRoutes.router;
