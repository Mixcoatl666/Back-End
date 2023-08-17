"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controllers_1 = require("../Controllers/usuarios-controllers");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarios_controllers_1.usuariosController.getUsuarios);
        this.router.get('/:id', usuarios_controllers_1.usuariosController.getByIdUsuario);
        this.router.post('/', usuarios_controllers_1.usuariosController.createUsuarios);
        this.router.delete('/:id', usuarios_controllers_1.usuariosController.deleteUsuario);
        this.router.put('/:id', usuarios_controllers_1.usuariosController.updateUsuario);
        this.router.post('/login', usuarios_controllers_1.usuariosController.login);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
