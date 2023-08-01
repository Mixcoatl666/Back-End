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
exports.usuariosController = void 0;
const database_1 = require("../database");
class UsuariosController {
    getUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_usuarios');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener usuarios:', error);
                    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
                }
                else {
                    console.error('Error al obtener usuarios:', error);
                    res.status(500).json({ error: 'Error al obtener usuarios' });
                }
            }
        });
    }
    getByIdUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_usuarios WHERE id_usuario = ?', [id]);
            res.json(result[0]);
        });
    }
    createUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_usuarios SET ?', [req.body]);
            res.json({ message: 'Usuario Guardado' });
        });
    }
    deleteUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.pool.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id]);
            res.json({ message: 'Usuario Eliminado' });
        });
    }
    updateUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.pool.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id]);
            res.json({ message: 'Usuario Actualizado' });
        });
    }
}
exports.usuariosController = new UsuariosController();
