import { Router } from "express";
import { tiposController } from "../Controllers/tipos-controllers";

class TiposRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', tiposController.getTipos);
        this.router.get('/:id_tipo', tiposController.getByTipos);
        this.router.post('/', tiposController.createTipos);
        this.router.delete('/id_tipo', tiposController.deleteTipos);
        this.router.put('/:id_tipo', tiposController.updateTipos);
    }

}

const tiposRoutes = new TiposRoutes();
export default tiposRoutes.router;