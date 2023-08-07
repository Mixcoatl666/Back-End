import express, { Application, Request, Response, NextFunction } from 'express';
import tiposRoutes from './Routes/tipos-routes';
import clientesRoutes from './Routes/clientes-routes';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './Routes/index-routes';
import usuariosRoutes from './Routes/usuarios-routes';
import pedidosRoutes from './Routes/pedidos-routes';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.errorHandler(); // Agregamos el manejador de errores
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded());
  }

  routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/tipos', tiposRoutes);
    this.app.use('/usuarios',usuariosRoutes);
    this.app.use('/clientes', clientesRoutes);
    this.app.use('/pedidos', pedidosRoutes);
  }

  // Manejador de errores
  errorHandler(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send('¡Algo salió mal en el servidor!');
    });
  }

  start(): void {
    this.app.listen(this.app.get('port'),()=>{
      console.log('Server on port: ',this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();