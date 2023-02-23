import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, map, Subject } from 'rxjs';
import router from '../router';
import { LoginRequest, LoginResponse } from '../shared/Login';
import { RegisterRequest, RegisterResponse } from '../shared/Register';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient, private router: Router) { }

    private loginStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    // Method to check if user is authenticated
    public isAuthenticated(): boolean {
        // Get token from localstorage
        const token = localStorage.getItem("token");

        // Check to see if token exists, if not return false
        if (!token) {
            localStorage.removeItem("token");
            return false;
        }

        // Decode token and get expiration date
        const tokenInfo = this.getDecodedAccessToken(token); // decode token
        const expireDate = tokenInfo.exp; // get token expiration dateTime

        var current_time = Date.now() / 1000;
        if (current_time > expireDate) {
            /* expired */
            localStorage.removeItem("token");
            return false;
        }
        else {
            return true;
        }
    }

    get isLoggedIn() {
        return this.loginStatus.asObservable();
    }

    public login(creds: LoginRequest) {
        return this.http.post<LoginResponse>("/account/login", creds).pipe(
            map(result => {
                if (result && result.token) {
                    this.loginStatus.next(true);
                    localStorage.setItem("token", result.token);
                }
                return result;
            }));
    };

    public registerUser = (userInfo: RegisterRequest) => {
        return this.http.post<RegisterResponse>("/account/register", userInfo);
    }

    public logout = () => {
        this.loginStatus.next(false);
        localStorage.removeItem("token");
        this.router.navigate(['/login']);
    }
}