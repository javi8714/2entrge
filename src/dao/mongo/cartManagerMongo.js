import { cartsModel } from "../models/carts.model.js";


export class CartManagerMongo{
  constructor(){
      this.nodel=cartsModel;
    
  };
   
  
  async getAll(){
    try {
        const carts = await this.model.find();
        return carts;
    } catch (error) {
        throw error;
    }
  };

  async getCartById(id) {
    try {
        if (this.existsFile()) {
            let data = await fs.promises.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } else {
            this.carts = [];
            throw new Error('No se encontro el archivo de carrito, se cargará un arreglo vacío.')
        }
            let cart = this.carts.find((cart) => cart.id == id);
        if (!cart) {
            console.error('Carrito no encontrado');
            return;
        }
        return cart;
      } catch (error) {
        throw new Error(error.message);
      }
  };

  async save() {
    try {
        const cartCreation = await this.model.create({});
        return cartCreation;
    } catch (error) {
        throw error;
    }
  };

   // Actualizo carrito
  async updateCart(cid, updatedFields) {
    try {
        let cart = await this.getCartById(cid);
        if (!cart) return;
        Object.keys(updatedFields).forEach((key) => {
            cart[key] = updatedFields[key];
        });
        const data = JSON.stringify(this.carts, null, 4);
        await fs.promises.writeFile(this.path, data);
        console.log('Carrito actualizado:', cart);
        return 'Archivo de carrito guardado.';
    } catch (error) {
        throw new Error(error.message);
    }
  };
} 