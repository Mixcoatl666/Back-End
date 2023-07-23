import { Router } from "express";
import { tiposController } from "../Controllers/clientes-controllers";

class ClientesRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', tiposController.getClientes);
        this.router.get('/:id_cliente', tiposController.getByClientes);
        this.router.post('/', tiposController.createClientes);
        this.router.delete('/:id_cliente', tiposController.deleteClientes);
        this.router.put('/:id_cliente', tiposController.updateClientes);
    }

}

const tiposRoutes = new ClientesRoutes();
export default tiposRoutes.router;