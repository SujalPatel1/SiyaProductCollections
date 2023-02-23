import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "../../services/store.services";

@Component({
    selector: "checkout-page",
    templateUrl: "checkout.component.html",
    styleUrls: ['checkout.component.css']
})

export class Checkout implements OnInit {

    constructor(public store: Store, private router: Router) {
    }

    ngOnInit() {
        if (this.store.order.items.length === 0) {
            this.router.navigate(["/"]);
        }
    }

    onCheckout() {
        if (this.store.order.items.length === 0) {
            this.router.navigate(["/"]);
        }
        if (this.store.order.addressId === 0) {
            this.store.errorMessage = "Add or Select the shipping address";
        }
        else {
            this.store.errorMessage = "";
            this.store.checkout()
                .subscribe(() => {
                    this.store.clearOrder();
                    this.router.navigate(["/"]);
                    alert("Order Complete...");
                }, error => {
                    this.store.errorMessage = `Failed to checkout: ${error}`;
                });
        }
    }
}