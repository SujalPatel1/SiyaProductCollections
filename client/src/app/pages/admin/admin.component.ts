import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Store } from '../../services/store.services';

@Component({
    selector: "admin-page",
    templateUrl: "admin.component.html"
})

export class AdminComponent {
    public successMessage!: string;
    public errorMessage!: string;
    public showError!: boolean;
    public showSuccess!: boolean;

    file: any = ''; // Variable to store file 
    formData = new FormData();

    imageUpload(event: any) {
        this.file = event.target.files[0]; 
    }

    productForm: FormGroup = new FormGroup({
        title: new FormControl(''),
        price: new FormControl(''),
        stock: new FormControl(''),
        categoryId: new FormControl(''),
        description: new FormControl(''),
        brand: new FormControl(''),
        size: new FormControl(''),
        discountPercentage: new FormControl(''),
        image: new FormControl(''),
        formFile: new FormControl('')
    });
    submitted = false;

    get f(): { [key: string]: AbstractControl } {
        return this.productForm.controls;
    }

    constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private http: HttpClient, public store: Store) { } 

    ngOnInit(): void {
        
        this.store.getProductCategories()
            .subscribe();

        this.productForm = this.formBuilder.group(
            {
                title: ['', [Validators.required]],
                price: ['', [Validators.required]],
                stock: ['', [Validators.required]],
                categoryId: ['', [Validators.required]],
                discountPercentage: [''],
                brand: [''],
                size: [''],
                description: [''],
                image: [''],
                formFile: ['']
            }
        );
    }

    public registerProduct = (productFormValue: any) => {
        this.showError = false;
        this.showSuccess = false;
        this.submitted = true;

        if (this.productForm.invalid) {
            return;
        }
        const formValues = { ...productFormValue };

        this.formData.append('Title', formValues.title);
        this.formData.append('Description', formValues.description);
        this.formData.append('Price', formValues.price);
        this.formData.append('CategoryId', formValues.categoryId)
        this.formData.append('Stock', formValues.stock);
        this.formData.append('DiscountPercentage', formValues.discountPercentage);
        this.formData.append('Size', formValues.size);
        this.formData.append('Brand', formValues.brand);
        if (this.file != '') {
            this.formData.append("Image", this.file, this.file.name);
        }

        this.authService.addProduct(this.formData)
            .subscribe({
                next: (_) => {
                    this.successMessage = "Product successfully added!"
                    this.showSuccess = true;
                    this.onReset();
                },
                error: (err: HttpErrorResponse) => {
                    this.errorMessage = "Error occured while trying to add the product."
                    this.showError = true;
                }
            });
    };

    onReset(): void {
        this.submitted = false;
        this.productForm.reset();
    }
}
