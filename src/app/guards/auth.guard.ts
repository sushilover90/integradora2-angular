import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {GetUrlService} from "../services/get-url.service";
import {Observable} from "rxjs";
import {HttpClientService} from "../services/http-client.service";

@Injectable({
    providedIn: 'root'
})
// @ts-ignore
export class AuthGuard implements CanActivate {

    constructor(private httpClientService: HttpClientService, private router:Router) {}

    canActivate():boolean{

        const has_token:boolean = !! localStorage.getItem('token');

        if(!has_token){

            console.log('has no token');
            this.router.navigate(['/']);
            return false;

        }

        return  true;

    }

}
