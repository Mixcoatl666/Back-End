import { Router } from "express";
import { materialesController } from "../Controllers/materiales-controllers";

    class MaterialesRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', materialesController.getMateriales);
        this.router.get('/:id_producto', materialesController.getByMateriales);
        this.router.post('/', materialesController.createMateriales);
        this.router.delete('/:id_producto', materialesController.deleteMateriales);
        this.router.put('/:id_producto', materialesController.updateMateriales);
    }

}

const materialesRoutes = new MaterialesRoutes();
export default materialesRoutes.router;