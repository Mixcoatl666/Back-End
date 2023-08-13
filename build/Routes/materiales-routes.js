"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materiales_controllers_1 = require("../Controllers/materiales-controllers");
class MaterialesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', materiales_controllers_1.materialesController.getMateriales);
        this.router.get('/:id_producto', materiales_controllers_1.materialesController.getByMateriales);
        this.router.post('/', materiales_controllers_1.materialesController.createMateriales);
        this.router.delete('/:id_producto', materiales_controllers_1.materialesController.deleteMateriales);
        this.router.put('/:id_producto', materiales_controllers_1.materialesController.updateMateriales);
    }
}
const materialesRoutes = new MaterialesRoutes();
exports.default = materialesRoutes.router;
