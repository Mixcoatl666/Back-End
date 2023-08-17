import { Router } from "express";
import { usuariosController } from "../Controllers/usuarios-controllers";

class UsuariosRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', usuariosController.getUsuarios);
        this.router.get('/:id', usuariosController.getByIdUsuario);
        this.router.post('/', usuariosController.createUsuarios);
        this.router.delete('/:id', usuariosController.deleteUsuario);
        this.router.put('/:id', usuariosController.updateUsuario);
        this.router.post('/login', usuariosController.login);
    }

}

const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;