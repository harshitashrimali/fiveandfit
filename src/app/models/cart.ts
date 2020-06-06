import { CartItem } from './CartItem';

export class Cart {
    dateCreated: string;
    items: { [key:string] : CartItem };
    cartItems: CartItem[] = [];
    
    constructor(dateCreated: string, items: { [key:string] : CartItem }) {
        this.dateCreated = dateCreated;
        this.items = items;

        for(let productId in this.items) {
            let item = this.items[productId];
            this.cartItems.push(new CartItem(item.product, item.quantity, productId));
        }

    }

    getItemQuantity(productId) {
        if(this.items && this.items[productId]){
            return this.items[productId].quantity;
        }else{
         return 0;
        }
    }

    get totalQuantity() {
        let quantity = 0;
        if(localStorage.getItem('cartId')){
            for(let productId in this.items) {
                let item = this.items[productId];
                quantity += item.quantity;
            }
        }
        return quantity;
    }

    get totalPrice() {
        let total = 0;
        for(let cartItem of this.cartItems) {
            total += cartItem.subtotal;
        }
        return total;
    }
}