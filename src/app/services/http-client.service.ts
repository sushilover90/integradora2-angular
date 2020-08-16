import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


// @ts-ignore
export class HttpClientService {

  constructor(private http_client : HttpClient) { }

  // set a http request and return its observable
    makeRequest(method:string, url:string,
                options?: {
                    body?:any, headers?:HttpHeaders;
                }
    ): Observable<any>{

      // if request needs to be set with body and headers (optionally)
      if(options!=null){

          // then set them
          return this.http_client.request(method,url,options);

      }

      return this.http_client.request(method,url);

    } // makeRequest method end

}
