import { Router } from "express";
import { clientesController } from "../Controllers/clientes-controllers";

class ClientesRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', clientesController.getClientes);
        this.router.get('/:id_cliente', clientesController.getByClientes);
        this.router.post('/', clientesController.createClientes);
        this.router.delete('/:id_cliente', clientesController.deleteClientes);
        this.router.put('/:id_cliente', clientesController.updateClientes);
        this.router.post('/login', clientesController.login);
        this.router.post('/registro', clientesController.registro);
    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;