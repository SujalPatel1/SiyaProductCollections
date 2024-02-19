import { Component, OnInit } from "@angular/core";
import { Store } from "../../services/store.services";

@Component({
    selector: "order-page",
    templateUrl: "order.component.html",
    styleUrls: ["order.component.css"]
})
export class OrderPage implements OnInit {

    constructor(public store: Store) { }

    ngOnInit(): void {
        this.store.getOrders()
            .subscribe(); // Kicks off the operation
        this.store.getUserAddress()
            .subscribe(); // Kicks off the operation
    }
}