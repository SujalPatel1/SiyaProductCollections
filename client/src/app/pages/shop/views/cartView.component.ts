import { Component, OnInit } from "@angular/core";
import { Store } from "../../../services/store.services";

@Component({
    selector: "cart",
    templateUrl: "cartView.component.html",
    styleUrls: ["cartView.component.css"]
})
export class CartView implements OnInit {
    constructor(public store: Store)  {

    }
    ngOnInit(): void {
        this.store.loadCartItems()
    }
}