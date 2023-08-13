import { Router } from "express";
import { productosController } from "../Controllers/productos-controllers";
class ProductosRoutes{
    public router:Router=Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', productosController.getProductos);
        this.router.get('/:id_producto', productosController.getByProductos);
        this.router.post('/', productosController.createProductos);
        this.router.delete('/:id_producto', productosController.deleteProductos);
        this.router.put('/:id_producto', productosController.updateProductos);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;