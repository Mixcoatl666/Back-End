"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tipos_routes_1 = __importDefault(require("./Routes/tipos-routes"));
const clientes_routes_1 = __importDefault(require("./Routes/clientes-routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./Routes/index-routes"));
const usuarios_routes_1 = __importDefault(require("./Routes/usuarios-routes"));
const uploads_routes_1 = __importDefault(require("./Routes/uploads-routes"));
const path_1 = __importDefault(require("path"));
const pedidos_routes_1 = __importDefault(require("./Routes/pedidos-routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.errorHandler(); // Agregamos el manejador de errores
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded());
    }
    routes() {
        this.app.use('/', index_routes_1.default);
        this.app.use('/tipos', tipos_routes_1.default);
        this.app.use('/usuarios', usuarios_routes_1.default);
        this.app.use('/clientes', clientes_routes_1.default);
        this.app.use('/galeria', uploads_routes_1.default);
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
        this.app.use('/pedidos', pedidos_routes_1.default);
    }
    // Manejador de errores
    errorHandler() {
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send('¡Algo salió mal en el servidor!');
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
