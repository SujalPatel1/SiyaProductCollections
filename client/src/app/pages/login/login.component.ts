import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { Store } from "../../services/store.services";
import { LoginRequest, LoginResponse } from "../../shared/Login";

@Component({
    selector: "login-page",
    templateUrl: "login.component.html"
})
export class Login implements OnInit {

    fieldTextType!: boolean;

    toggleFieldTextType() {
        this.fieldTextType = !this.fieldTextType;
    }

    errorMessage: string = '';
    showError!: boolean;

    loginForm: FormGroup = new FormGroup({
        username: new FormControl(''),
        password: new FormControl('')
    });
    submitted = false;

    constructor(private store: Store, private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group(
            {
                username: ['', [Validators.required]],
                password: ['', [Validators.required]],
            }
        );
    }

    get password(): any { return this.loginForm.get('password'); }
    clearPassword() { this.password.reset(); }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    public loginUser = (loginFormValue: any) => {
        this.showError = false;
       
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        const formValues = { ...loginFormValue };
        const userForAuth: LoginRequest = {
            username: formValues.username,
            password: formValues.password
        };

        this.authService.login(userForAuth)
            .subscribe({
                next: (res: LoginResponse) => {
                    if (this.store.order.items.length > 0) {
                        this.router.navigate(["checkout"]);
                    } else {
                        this.router.navigate([""]);
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.errorMessage = err.message;
                    this.clearPassword();
                    this.showError = true;
                }
            });
    }
}