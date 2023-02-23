export class Address {
    addressId!: number;
    customerFirstName!: string;
    customerLastName!: string;
    addressLine1!: string;
    addressLine2!: string;
    city!: string;
    state!: string;
    zipCode!: string;
    country!: string;
    isBillingAddress: boolean = false;
    isShippingAddress: boolean = false; 
    isPostalAddress: boolean = false;
    isChangeable: boolean = false;
}
