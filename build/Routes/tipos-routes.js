"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_controllers_1 = require("../Controllers/tipos-controllers");
class TiposRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', tipos_controllers_1.tiposController.getTipos);
        this.router.get('/:id_tipo', tipos_controllers_1.tiposController.getByTipos);
        this.router.post('/', tipos_controllers_1.tiposController.createTipos);
        this.router.delete('/id_tipo', tipos_controllers_1.tiposController.deleteTipos);
        this.router.put('/:id_tipo', tipos_controllers_1.tiposController.updateTipos);
    }
}
const tiposRoutes = new TiposRoutes();
exports.default = tiposRoutes.router;
