import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Validation } from "../../custom-validators/validation";
import { AuthenticationService } from "../../services/authentication.service";
import { RegisterRequest } from "../../shared/Register";

@Component({
    selector: "register-page",
    templateUrl: "register.component.html"
})
export class Register implements OnInit {

    public errorMessage!: string;
    public showError!: boolean;
    public showSuccess!: boolean;
    public successMessage!: string;

    registerForm: FormGroup = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl('')
    });
    submitted = false;
 
    constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group(
            {
                firstName: ['', [Validators.required]],
                lastName: [''],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(25)]],
                confirmPassword: ['', Validators.required]
            },
            {
                validators: [Validation.match('password', 'confirmPassword')]
            }
        );
    }

    get f(): { [key: string]: AbstractControl } {
        return this.registerForm.controls;
    }

    public registerUser = (registerFormValue: any) => {
        this.showError = false;
        this.showSuccess = false;

        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const formValues = { ...registerFormValue };
        const user: RegisterRequest = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword
        };

        this.authService.registerUser(user)
            .subscribe({
                next: (_) => {
                    this.successMessage = "User successfully registered!"
                    this.showSuccess = true;
                    this.onReset();
                },
                error: (err: HttpErrorResponse) => {
                    this.errorMessage = err.message;
                    this.showError = true;
                }
            });
    };

    onReset(): void {
        this.submitted = false;
        this.registerForm.reset();
    }
}