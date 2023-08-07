import { Router } from "express";
import {  } from "../Controllers/uploads-controllers"; 

class UploadRoutes {
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', )
    }
}

const uploadsRoutes = new UploadRoutes();
export default uploadsRoutes.router;