import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpClientService} from "../services/http-client.service";
import {GetUrlService} from "../services/get-url.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class VerifyTokenGuard implements CanActivate {
  constructor(private httpClientService: HttpClientService,private router: Router) {

  }
  canActivate():boolean|Observable<boolean>{

    return true;

  }
  
}
