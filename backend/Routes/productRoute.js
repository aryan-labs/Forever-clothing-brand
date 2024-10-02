import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct,upload } from '../controllers/productController.js'



const productRouter = express.Router();

productRouter.post('/add',upload,addProduct);
productRouter.post('/remove',removeProduct);
productRouter.post('/single',singleProduct);
productRouter.get('/list',listProducts)

export default productRouter