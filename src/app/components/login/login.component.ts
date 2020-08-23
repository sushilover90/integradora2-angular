import {Component, EventEmitter, isDevMode, OnInit, Output} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AuthAlertData} from "../../interfaces/auth-alert-data";
import {HttpClientService} from "../../services/http-client.service";
import {GetUrlService} from "../../services/get-url.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email = "e@e.com";
  public password = "123123123";

  @Output() public alert_data = new EventEmitter();
  @Output() public clear_alert_data = new EventEmitter();

  constructor(private httpClientService: HttpClientService,private router: Router) { }

  ngOnInit(): void {
  }

  log_in():void{

    this.trim_form_fields();

    if(this.are_fields_empty()){
      return;
    }

    this.send_login_request();

    this.clear_alert_data.emit();

  }

  are_fields_empty():boolean{
    return this.email === "" || this.password === "";
  }

  clear_password_input():void{
    this.password = "";
  }

  clear_email_input():void{
    this.email = "";
  }

  send_login_request():void{

    const user_login_url:string = `${GetUrlService.get_api_url()}/user/login`;

    const options = {
      body: {
        email:this.email,
        password:this.password
      }
    };

    this.httpClientService.makeRequest('post',user_login_url,options)
        .subscribe(
            response => {
              localStorage.setItem('token',response.auth.token);
              localStorage.setItem('username',this.email);
              this.router.navigate(['home']);
            },
            error => {
              console.log(error);
              if(error instanceof HttpErrorResponse)
              {

                let alert_data:AuthAlertData;

                if(error.status === 500)
                {
                  alert_data = {
                    title:'Error de servidor',
                    http_code: 500,
                    auth_data:{
                      title_message: 'Inicio de sesión no exitoso.',
                      username: this.email,
                      message: 'Hubo un problema en el servidor. Intente nuevamente. Si el problema persiste, por favor notifíquenos.'
                    }
                  }
                  this.alert_data.emit(alert_data);
                  return;
                }

                if(error.status === 401)
                {
                  alert_data = {
                    title:'Error de autorización',
                    http_code: 401,
                    auth_data:{
                      title_message: 'Inicio de sesión no autorizado.',
                      username: this.email,
                      message: 'Una o sus credenciales no coinciden, verifique e intente nuevamente.'
                    }
                  }
                  this.alert_data.emit(alert_data);
                  return;
                }

              }
            }
        );

  }

  trim_form_fields():void{
    this.email = this.email.trim();
    this.password = this.password.trim();
  }

}
