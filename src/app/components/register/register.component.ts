import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {environment} from "../../../environments/environment";
import {AuthAlertData} from "../../interfaces/auth-alert-data";
import {GetUrlService} from "../../services/get-url.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email:string = "e@e.com";
  public confirm_email = "e@e.com";
  public password = "123123123";
  public confirm_password = "123123123";
  //http://picserio.com/circuit-board-desktop-wallpaper/5611334.html

  @Output() public show_login_component = new EventEmitter();
  @Output() public alert_data = new EventEmitter();
  @Output() public clear_alert_data = new EventEmitter();

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
  }

  register():void{

    this.trim_form_fields();

    if(this.are_fields_empty()){
      return;
    }

    if(!this.are_fields_confirmed()){
      return;
    }

    this.send_register_request();

    this.clear_alert_data.emit();

  }

  are_fields_confirmed():boolean{
    return !(this.email !== this.confirm_email || this.password !== this.confirm_password);
  }

  are_fields_empty():boolean{
    return this.email === "" || this.password === "" || this.confirm_email === "" || this.confirm_password === "";
  }

  clear_confirm_password_input():void{
    this.confirm_password = "";
  }

  clear_password_input():void{
    this.password = "";
  }

  clear_email_input():void{
    this.email = "";
  }

  clear_confirm_email_input():void{
    this.confirm_email = "";
  }

  send_register_request():void{

    const user_register_url:string = `${GetUrlService.get_api_url()}/user/register`;

    const options = {
      body: {
        email:this.confirm_email,
        password:this.confirm_password
      }
    };

    this.httpClientService.makeRequest('post',user_register_url,options)
        .subscribe(
            response => {
              const alert_data:AuthAlertData = {
                title: 'Éxito.',
                http_code: 200,
                auth_data: {
                  title_message: 'Se registró correctamente.',
                  username: response.username,
                  message: `Su usuario es: ${response.username}`
                }
              }
              console.log(response);
              this.show_login_component.emit(0);
              this.alert_data.emit(alert_data)
            },
            error => {
              console.log(error);
            }
        );

  }

  trim_form_fields():void{
    this.email = this.email.trim();
    this.confirm_email = this.email.trim();
    this.password = this.password.trim();
    this.confirm_password = this.confirm_password.trim();
  }

}
