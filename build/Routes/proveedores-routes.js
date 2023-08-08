"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proveedores_controllers_1 = require("../Controllers/proveedores-controllers");
class ProveedoresRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proveedores_controllers_1.proveedoresController.getProveedores);
        this.router.get('/:id', proveedores_controllers_1.proveedoresController.getByIdProveedor);
        this.router.post('/', proveedores_controllers_1.proveedoresController.createProveedores);
        this.router.delete('/:id', proveedores_controllers_1.proveedoresController.deleteProveedor);
        this.router.put('/:id', proveedores_controllers_1.proveedoresController.updateProveedor);
    }
}
const proveedoresRoutes = new ProveedoresRoutes();
exports.default = proveedoresRoutes.router;
