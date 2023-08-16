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
        this.router.get('/', clientes_controllers_1.clientesController.getClientes);
        this.router.get('/:id_cliente', clientes_controllers_1.clientesController.getByClientes);
        this.router.post('/', clientes_controllers_1.clientesController.createClientes);
        this.router.delete('/:id_cliente', clientes_controllers_1.clientesController.deleteClientes);
        this.router.put('/:id_cliente', clientes_controllers_1.clientesController.updateClientes);
        this.router.post('/login', clientes_controllers_1.clientesController.login);
        this.router.post('/registro', clientes_controllers_1.clientesController.registro);
    }
}
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
