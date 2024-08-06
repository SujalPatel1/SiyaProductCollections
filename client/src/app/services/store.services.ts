import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Address } from "../shared/Address";
import { Category } from "../shared/Category";
import { Order, OrderItem } from "../shared/Order";
import { Product } from "../shared/Product";

@Injectable()
export class Store {

    token = localStorage.getItem('token');
    errorMessage!: string;
    showProductDetail!: boolean;
   
    itemLimitMsg = new Map<number, string>();
    products: Product[] = [];
    userOrders: Order[] = [];
    viewProduct!: any;

    selected = -1;
    filterBy: string = 'priceLowToHigh';
    selectedProductCategories = new Map<string, boolean>();
    productCategories: Category[] = [];
    categoryIds!: string;

    addressList: Address[] = [];
    shipperName!: string;
    shippingAddress!: string;
    enableAddressForm!: boolean;

    constructor(private http: HttpClient) { }

    getProductDetail(productId: number) {
        this.showProductDetail = true;
        let urlLink = "api/products/getProductById/" + productId;

        return this.http.get(urlLink)
            .pipe(map(data => {
                this.viewProduct = data;
                return;
            })).subscribe();
    }

    closeProductDetailBox() {
        this.showProductDetail = false;
    }

    getProductCategories() {
        return this.http.get<[]>("api/products/getProductCategories")
            .pipe(map(data => {
                this.productCategories = data;
                return;
            }));
    }

    sortProductByPrice(event: any, i: number) {
        this.selected = i;
        if (!event.target.checked) {
            this.selected = -1;
        }
       

        if (this.selected == 0)
            this.filterBy = 'priceLowToHigh';
        else
            this.filterBy = 'priceHighToLow';

        if (this.selectedProductCategories.size > 0) {
            this.selectedProductCategories.forEach((value: boolean, key: string) => {
                if (value == true && this.selectedProductCategories.size == 1) {
                    this.categoryIds = key;
                } else if (value == true && this.selectedProductCategories.size > 1) {
                    this.categoryIds += key + ",";
                }
            });
        }

        if (this.categoryIds != "" && this.selectedProductCategories.size > 0) {
            const lastCommaRemoved = Array.from(new Set(this.categoryIds.split(','))).toString().replace(/,*$/, '');
            let urlLink = "api/products/sortProductsByPrice/" + this.filterBy + "/" + lastCommaRemoved;
            return this.http.get<[]>(urlLink)
                .pipe(map(data => {
                    this.products = data;
                    return;
                })).subscribe();
        } else {
            let urlLink = "api/products/sortProductsByPrice/" + this.filterBy;
            if (event.target.checked == true) {
                return this.http.get<[]>(urlLink)
                    .pipe(map(data => {
                        this.products = data;
                        return;
                    })).subscribe();
            } else {
                return this.http.get<[]>("api/products")
                    .pipe(map(data => {
                        this.products = data;
                        return;
                    })).subscribe();
            }
        }
    }

    updateProductByCategory(event: Event, checked: boolean) {       
        const filterCategoryId = (event.target as HTMLInputElement).value;
        this.selectedProductCategories.set(filterCategoryId, checked);
        this.categoryIds = "";

        if (this.selectedProductCategories.size > 0) {
            this.selectedProductCategories.forEach((value: boolean, key: string) => {
                if (value == true && this.selectedProductCategories.size == 1) {
                    this.categoryIds = key;
                } else if (value == true && this.selectedProductCategories.size > 1) {
                    this.categoryIds += key + ",";
                }
            });
        }

        if (this.categoryIds != "") { 
            const lastCommaRemoved = this.categoryIds.replace(/,*$/, '');

            if (this.selected != -1) {
                let urlLink = "api/products/getProductByCatagoryIds/" + lastCommaRemoved + "/" + this.filterBy;
                return this.http.get<[]>(urlLink)
                    .pipe(map(data => {
                        this.products = data;
                        return;
                    })).subscribe();
            }
            else {
                let urlLink = "api/products/getProductByCatagoryIds/" + lastCommaRemoved;
                return this.http.get<[]>(urlLink)
                    .pipe(map(data => {
                        this.products = data;
                        return;
                    })).subscribe();
            }
        } else {
            return this.http.get<[]>("api/products")
                .pipe(map(data => {
                    this.products = data;
                    return;
                })).subscribe();
        }
    }

    getOrders(): Observable<void> {
        return this.http.get<[]>("api/orders")
            .pipe(map(data => {
                this.userOrders = data;
                return;
            }));
    }

    loadCartItems() {
        let cartItem = JSON.parse(localStorage.getItem('cart-item') || '{}');
        if (Object.keys(cartItem).length > 0) {
            this.order.items = cartItem;
        }
    }

    loadProducts(): Observable<void> {
        return this.http.get<[]>("api/products")
            .pipe(map(data => {
                this.products = data;
                return;
        }));
    }
    addProducts(product: Product) {
        return this.http.post<Product>("api/products",{} ,{}).subscribe(data => {
            this.products.push(product);
        });
    }

    addNewAddress(addressInfo: Address) {
        return this.http.post<Address>("api/address", addressInfo);
    }

    getUserAddress(): Observable<void> {
        return this.http.get<[]>("api/address")
            .pipe(map(data => {
                this.addressList = data;
                return;
            }));
    }

    selectedAddressId!: number;
    onAddressSelected(value: string): void {
        var id: number = +value;
        this.selectedAddressId = id || 0;
        var addressInfo = this.addressList.find(p => p.addressId === this.selectedAddressId);
        if (addressInfo) {
            this.order.addressId = addressInfo.addressId;
        }
    }

    public order: Order = new Order();
    
    disableAddBtn(productId: number, message: string, flag: boolean) {
        var qtyAddBtn = <HTMLInputElement>document.getElementById('qtyPlusBtn_' + productId);
        qtyAddBtn.disabled = flag;
        this.itemLimitMsg.set(productId, message);
    }
    getTotalItemPriceBasedOnQty(productId: number) {
        var item = this.order.items.find(p => p.productId === productId);
        if (item) {
            return item?.quantity * item?.unitPrice;
        }
        return 0;
    }
    getQuantity(productId: number) {
        return this.order.items.find(p => p.productId === productId)?.quantity;
    }
    removeQuantity(productId: number) {
        let item = this.order.items.find(p => p.productId === productId);
        if (item) {
            item.quantity--;
            if (item.quantity < item.productStock) {
                // Remove the disabled attribute
                this.disableAddBtn(productId, "", false);
            }
            if (item.quantity <= 0) {
                const objWithIdIndex = this.order.items.findIndex(p => p.productId === productId);

                if (objWithIdIndex > -1) {
                    this.order.items.splice(objWithIdIndex, 1);
                    localStorage.setItem("cart-item", JSON.stringify(this.order.items));
                }
            }
            localStorage.setItem("cart-item", JSON.stringify(this.order.items));
        }
    }
    addQuantity(productId: number) {
        let item = this.order.items.find(p => p.productId === productId);
        if (item) {
            if (item.quantity < item.productStock) {
                item.quantity++;
                localStorage.setItem("cart-item", JSON.stringify(this.order.items));
            } else {
                // Set disabled attribute
                this.disableAddBtn(productId, "(" + item.productStock + " item limit)", true);
            }
        }
    }
    deleteItem(productId: number) {
        const objWithIdIndex = this.order.items.findIndex(p => p.productId === productId);

        if (objWithIdIndex > -1) {
            this.order.items.splice(objWithIdIndex, 1);
            localStorage.setItem("cart-item", JSON.stringify(this.order.items));
            // Remove the disabled attribute
            this.disableAddBtn(productId, "", false);
        }
    }
    addToOrder(product: Product) {
        let item = this.order.items.find(p => p.productId === product.id);
        if (item) {
            if (item.quantity < item.productStock) {
                item.quantity++;
                localStorage.setItem("cart-item", JSON.stringify(this.order.items));
            }
            else {
                // Set disabled attribute
                this.disableAddBtn(product.id, "(" + item.productStock + " item limit)", true);
            }
        } else {
            item = new OrderItem();
            item.productId = product.id;
            item.productTitle = product.title;
            item.productDescription = product.description;
            item.productPrice = product.price;
            item.productDiscountPercentage = product.discountPercentage;
            item.productImageName = product.imageName;
            item.productStock = product.stock;
            item.productSize = product.size;

            if (product.discountPercentage > 0)
                item.unitPrice = (product.price - (product.price * product.discountPercentage / 100))
            else 
                item.unitPrice = product.price;
        
            item.quantity = 1;
            this.order.items.push(item);
            localStorage.setItem("cart-item", JSON.stringify(this.order.items));
        } 
    }
   
    clearOrder() {
        this.order = new Order();
        localStorage.removeItem("cart-item");
    }
    checkout() {
        //const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
        this.order.orderStatusId = 1;
        this.order.orderTotal = this.order.subtotal + this.order.shippingCost;

        return this.http.post("/api/orders", this.order) //, { headers: headers })
            .pipe(map(() => {
                this.order = new Order();
            }));
    }
}