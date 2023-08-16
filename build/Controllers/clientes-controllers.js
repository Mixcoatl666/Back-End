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
exports.clientesController = void 0;
const database_1 = require("../database");
class ClientesController {
    getClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_clientes');
                res.json(result[0]);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener clientes:', error);
                    res.status(500).json({ error: 'Error al obtener clientes', details: error.message });
                }
                else {
                    console.error('Error al obtener clientes:', error);
                    res.status(500).json({ error: 'Error al obtener clientes' });
                }
            }
        });
    }
    getByClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
            res.json(result[0]);
        });
    }
    createClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.pool.query('INSERT INTO tb_clientes SET ?', [req.body]);
            res.json({ message: 'Cliente Guardado' });
        });
    }
    updateClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            yield database_1.pool.query('UPDATE tb_clientes SET ? WHERE id_cliente = ?', [req.body, id_cliente]);
            res.json({ message: 'Cliente Actualizado' });
        });
    }
    deleteClientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_cliente } = req.params;
            yield database_1.pool.query('DELETE FROM tb_clientes WHERE id_cliente = ?', [id_cliente]);
            res.json({ message: 'Cliente Eliminado' });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, pass } = req.body;
            try {
                const result = yield database_1.pool.query('SELECT * FROM tb_clientes WHERE correo = ? AND pass = ?', [correo, pass]);
                const rows = result[0];
                console.log('Correo: ' + correo);
                console.log('Pass: ' + pass);
                if (rows.length > 0) {
                    // Usuario autenticado
                    res.json({ message: 'Autenticación exitosa' });
                }
                else {
                    res.status(401).json({ error: 'Datos incorrectos' });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error en inicio de sesión:', error);
                    res.status(500).json({ error: 'Error en inicio de sesión', details: error.message });
                }
                else {
                    console.error('Error en inicio de sesión:', error);
                    res.status(500).json({ error: 'Error en inicio de sesión' });
                }
            }
        });
    }
    registro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nom_cliente, correo, direccion, telefono, rfc, pass } = req.body;
            try {
                // Verificar si ya existe un usuario con el mismo correo
                const existingUser = yield database_1.pool.query('SELECT * FROM tb_clientes WHERE correo = ?', [correo]);
                const rows = existingUser[0];
                console.log('nom_cliente' + nom_cliente);
                console.log('Correo: ' + correo);
                console.log('direccion' + direccion);
                console.log('telefono' + telefono);
                console.log('rfc' + rfc);
                console.log('Pass: ' + pass);
                if (rows.length > 0) {
                    res.status(409).json({ error: 'El correo ya está en uso' });
                }
                else {
                    // Registrar al nuevo usuario
                    yield database_1.pool.query('INSERT INTO tb_clientes (nom_cliente, correo, direccion, telefono, rfc, pass) VALUES (?, ?, ?, ?, ?, ?)', [nom_cliente, correo, direccion, telefono, rfc, pass]);
                    res.json({ message: 'Usuario registrado exitosamente' });
                }
            }
            catch (error) {
                console.error('Error en registro:', error);
                res.status(500).json({ error: 'Error en inicio de sesión' });
            }
        });
    }
}
exports.clientesController = new ClientesController();
