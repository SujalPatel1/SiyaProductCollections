import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {
    public LoginStatus!: Observable<boolean>;
    items: any;
    menuBtn: any;
    searchBtn: any;
    cancelBtn: any;
    form: any;

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.LoginStatus = this.authService.isLoggedIn;
        this.items = document.querySelector(".nav-items");
        this.menuBtn = document.querySelector(".menu-icon span");
        this.searchBtn = document.querySelector(".search-icon");
        this.cancelBtn = document.querySelector(".cancel-icon");
        this.form = document.querySelector("form");
    }

    public logout = () => {
        this.authService.logout();
    }

    menuIconBtn() {
        this.items.classList.add("active");
        this.menuBtn.classList.add("hide");
        this.searchBtn.classList.add("hide");
        this.cancelBtn.classList.add("show");
    }

    cancelIconBtn() {
        this.items.classList.remove("active");
        this.menuBtn.classList.remove("hide");
        this.searchBtn.classList.remove("hide");
        this.cancelBtn.classList.remove("show");
        this.form.classList.remove("active");
        this.cancelBtn.style.color = "#ff3d00";
    }

    searchIconBtn() {
        this.form.classList.add("active");
        this.searchBtn.classList.add("hide");
        this.cancelBtn.classList.add("show");
    }
}