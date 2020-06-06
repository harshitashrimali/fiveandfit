import { CartItem } from './CartItem';

export interface Order {
    dateCreated: string;
    items: { [key: string]: CartItem }
    shipping: any,
    userId: string
}
