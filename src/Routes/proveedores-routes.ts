import { Router } from "express";
import { proveedoresController } from "../Controllers/proveedores-controllers";

class ProveedoresRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', proveedoresController.getProveedores);
        this.router.get('/:id', proveedoresController.getByIdProveedor);
        this.router.post('/', proveedoresController.createProveedores);
        this.router.delete('/:id', proveedoresController.deleteProveedor);
        this.router.put('/:id', proveedoresController.updateProveedor);
    }

}

const proveedoresRoutes = new ProveedoresRoutes();
export default proveedoresRoutes.router;