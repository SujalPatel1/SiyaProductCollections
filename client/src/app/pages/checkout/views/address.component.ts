import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "../../../services/store.services";
import { Address } from "../../../shared/Address";


@Component({
    selector: "address-section",
    templateUrl: "address.component.html",
    styleUrls: ["address.component.css"]
})
export class AddressView implements OnInit {

    constructor(public store: Store, private formBuilder: FormBuilder) { }

    errorMessage: string = '';
    showError!: boolean;
    showSuccess!: boolean;
    successMessage!: string;

    stateList: Array<any> = [
        { "name": "Alabama", "abbreviation": "AL" }, { "name": "Alaska", "abbreviation": "AK" },
        { "name": "Arizona", "abbreviation": "AZ" }, { "name": "Arkansas", "abbreviation": "AR" },
        { "name": "California", "abbreviation": "CA" }, { "name": "Colorado", "abbreviation": "CO" },
        { "name": "Connecticut", "abbreviation": "CT" }, { "name": "Delaware", "abbreviation": "DE" },
        { "name": "Florida", "abbreviation": "FL" }, { "name": "Georgia", "abbreviation": "GA" },
        { "name": "Hawaii", "abbreviation": "HI" }, { "name": "Idaho", "abbreviation": "ID" },
        { "name": "Illinois", "abbreviation": "IL" }, { "name": "Indiana", "abbreviation": "IN" },
        { "name": "Iowa", "abbreviation": "IA" }, { "name": "Kansas", "abbreviation": "KS" },
        { "name": "Kentucky", "abbreviation": "KY" }, { "name": "Louisiana", "abbreviation": "LA" },
        { "name": "Maine", "abbreviation": "ME" }, { "name": "Maryland", "abbreviation": "MD" },
        { "name": "Massachusetts", "abbreviation": "MA" }, { "name": "Michigan", "abbreviation": "MI" },
        { "name": "Minnesota", "abbreviation": "MN" }, { "name": "Mississippi", "abbreviation": "MS" },
        { "name": "Missouri", "abbreviation": "MO" }, { "name": "Montana", "abbreviation": "MT" },
        { "name": "Nebraska", "abbreviation": "NE" }, { "name": "Nevada", "abbreviation": "NV" },
        { "name": "New Hampshire", "abbreviation": "NH" }, { "name": "New Jersey", "abbreviation": "NJ" },
        { "name": "New Mexico", "abbreviation": "NM" }, { "name": "New York", "abbreviation": "NY" },
        { "name": "North Carolina", "abbreviation": "NC" }, { "name": "North Dakota", "abbreviation": "ND" },
        { "name": "Ohio", "abbreviation": "OH" }, { "name": "Oklahoma", "abbreviation": "OK" },
        { "name": "Oregon", "abbreviation": "OR" }, { "name": "Pennsylvania", "abbreviation": "PA" },
        { "name": "Rhode Island", "abbreviation": "RI" }, { "name": "South Carolina", "abbreviation": "SC" },
        { "name": "South Dakota", "abbreviation": "SD" }, { "name": "Tennessee", "abbreviation": "TN" },
        { "name": "Texas", "abbreviation": "TX" }, { "name": "Utah", "abbreviation": "UT" },
        { "name": "Vermont", "abbreviation": "VT" }, { "name": "Virginia", "abbreviation": "VA" },
        { "name": "Washington", "abbreviation": "WA" }, { "name": "West Virginia", "abbreviation": "WV" },
        { "name": "Wisconsin", "abbreviation": "WI" }, { "name": "Wyoming", "abbreviation": "WY" }
    ];

    addressForm: FormGroup = new FormGroup({
        addressId: new FormControl(''),
        customerFirstName: new FormControl(''),
        customerLastName: new FormControl(''),
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
        country: new FormControl(''),
        isBillingAddress: new FormControl(''),
        isShippingAddress: new FormControl(''),
        isPostalAddress: new FormControl(''),
        isChangeable: new FormControl('')
    });
    submitted = false;

    ngOnInit(): void {
        this.store.getUserAddress()
            .subscribe(); // Kicks off the operation

        this.addressForm = this.formBuilder.group(
            {
                addressId: [0],
                customerFirstName: ['', [Validators.required]],
                customerLastName: [''],
                addressLine1: ['', [Validators.required]],
                addressLine2: [''],
                city: ['', [Validators.required]],
                state: ['', [Validators.required]],
                zipCode: ['', [Validators.required, Validators.minLength(5)]],
                country: ['USA'],
                isBillingAddress: [false],
                isShippingAddress: [true],
                isPostalAddress: [false],
                isChangeable: [false]
            }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.addressForm.controls;
    }

    public addAddress = (addressFormValue: any) => {
        this.showError = false;
        this.showSuccess = false;
        this.submitted = true;

        if (this.addressForm.invalid) {
            return;
        }

        const formValues = { ...addressFormValue };
        const address: Address = {
            addressId: formValues.addressId,
            customerFirstName: formValues.customerFirstName,
            customerLastName: formValues.customerLastName,
            addressLine1: formValues.addressLine1,
            addressLine2: formValues.addressLine2,
            city: formValues.city,
            state: formValues.state,
            zipCode: formValues.zipCode,
            country: formValues.country,
            isBillingAddress: formValues.isBillingAddress,
            isPostalAddress: formValues.isPostalAddress,
            isShippingAddress: formValues.isShippingAddress,
            isChangeable: formValues.isChangeable
        };

        this.store.addNewAddress(address).subscribe({
            next: (_) => {
                //this.successMessage = "Address added successfully!"
                //this.showSuccess = true;
                this.store.enableAddressForm = false;
                this.onReset();
                this.store.getUserAddress()
                    .subscribe(); // Kicks off the operation

                this.addressForm = this.formBuilder.group(
                    {
                        customerFirstName: ['', [Validators.required]],
                        customerLastName: [''],
                        addressLine1: ['', [Validators.required]],
                        addressLine2: [''],
                        city: ['', [Validators.required]],
                        state: ['', [Validators.required]],
                        zipCode: ['', [Validators.required, Validators.minLength(5)]],
                        country: ['USA'],
                        isBillingAddress: [false],
                        isShippingAddress: [true],
                        isPostalAddress: [false],
                        isChangeable: [false]
                    })
                
            },
            error: (err: HttpErrorResponse) => {
                this.errorMessage = err.message;
                this.showError = true;
            }
        });;
    };

    onReset(): void {
        this.submitted = false;
        this.addressForm.reset();
    }

}