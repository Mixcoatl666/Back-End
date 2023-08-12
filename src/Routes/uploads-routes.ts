import { Router } from "express";
import { uploadsController } from "../Controllers/uploads-controllers"; 
import multer from "../libs/multer"

class UploadRoutes {
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', uploadsController.getPhoto);
        this.router.get('/:id_imagen', uploadsController.getByPhoto);
        this.router.post('/', multer.single('image') ,uploadsController.createPhoto);
        this.router.delete('/:id',);
        this.router.put('/:id',);
    }
}

const uploadsRoutes = new UploadRoutes();
export default uploadsRoutes.router;