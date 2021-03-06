import {Injectable, isDevMode} from '@angular/core';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
// @ts-ignore
export class GetUrlService {

  constructor() { }

  public static get_api_url():string{
    if(!isDevMode()){
      return environment.apiUrl;
    }

    return 'http://192.168.100.5:3333'
  }

  public static get_ws_url():string{
    if(!isDevMode()){
      return environment.wsUrl;
    }

    return 'ws://192.168.100.5:3333'
  }

}
