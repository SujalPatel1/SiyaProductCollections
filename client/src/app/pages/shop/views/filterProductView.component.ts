import { Component, OnInit } from "@angular/core";
import { Store } from "../../../services/store.services";

@Component({
    selector: "filter-product",
    templateUrl: "filterProductView.component.html",
    styleUrls: ["filterProductView.component.css"]
})

export class FilterProductView implements OnInit {

    constructor(public store: Store) { }

    ngOnInit(): void {
        this.store.getProductCategories()
            .subscribe();
    }

    sortByOptions = ['Price: Low To High', 'Price: High To Low'];
}
