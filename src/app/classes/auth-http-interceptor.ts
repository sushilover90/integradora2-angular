import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
// @ts-ignore
export class AuthHttpInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        if(req.headers.has('Content-Type')){

            req = req.clone({
                headers: req.headers.set('Content-Type','application/json')
            });

        }

        req = AuthHttpInterceptor.addAuthenticationToken(req);

        return next.handle(req);

    }

    private static addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any>{

        // if the request is going to another url.
        // do not set the token.
        if(!request.url.match(/http:\/\/localhost:3333\//)){
            return request;
        }

        // if there is no token registered yet.
        // do not set the token.
        if(localStorage.getItem('token')===null){
            return request;
        }

        // set the token.
        return request.clone({
            headers: request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
        });
    }

}
