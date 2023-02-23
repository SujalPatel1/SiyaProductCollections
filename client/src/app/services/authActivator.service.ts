import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthActivator implements CanActivate {

    constructor(private auth: AuthenticationService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>
    {
        if (!this.auth.isAuthenticated()) {
            this.auth.logout();
            return false;
        }
        return true;
    }
}