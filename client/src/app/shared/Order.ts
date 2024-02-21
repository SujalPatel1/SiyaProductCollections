import { Address } from "./Address";

export class OrderItem {
    id!: number;
    quantity!: number;
    unitPrice!: number;
    productId!: number;
    productTitle!: string;
    productDescription!: string;
    productPrice!: number;
    productDiscountPercentage!: number;
    productImageName!: string;
    productStock!: number;
    productSize!: string;
}

export class OrderStatus {
    id!: number;
    name!: string;
}

export class Order {
    orderId!: number;
    orderDate: Date = new Date();
    orderNumber: string = Math.random().toString(36).substring(2, 8);
    orderTotal!: number;
    orderStatusId!: number;
    items: OrderItem[] = new Array<OrderItem>();
    address!: Address;
    addressId: number = 0;
    orderStatus!: OrderStatus;

    get shippingCost(): number {
        if (this.subtotal > 50) {
            return 0.00;
        } else {
            return 5.99;
        }
    }
    get subtotal(): number {
        return this.items.reduce((tot: number, cur: OrderItem) => {
            return tot + (cur.quantity * cur.unitPrice);
        }, 0);
    }
}