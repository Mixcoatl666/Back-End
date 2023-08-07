import { Router } from "express";
import { pedidosController } from "../Controllers/pedidos-controller";

class PedidosRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', pedidosController.getPedidos);
        this.router.get('/:id_pedido', pedidosController.getByPedidos);
        this.router.post('/', pedidosController.createPedidos);
        this.router.delete('/:id_pedido', pedidosController.deletePedidos);
        this.router.put('/:id_pedido', pedidosController.updatePedidos);
    }

}

const pedidosRoutes = new PedidosRoutes();
export default pedidosRoutes.router;