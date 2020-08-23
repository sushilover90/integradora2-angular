import { Component, OnInit } from '@angular/core';
import {AuthAlertData} from "../../interfaces/auth-alert-data";

@Component({
  selector: 'app-user-authentication',
  templateUrl: './user-authentication.component.html',
  styleUrls: ['./user-authentication.component.css']
})
export class UserAuthenticationComponent implements OnInit {

  public component_id:number = 0;

  public show_alert:boolean = false;

  public auth_alert_data:AuthAlertData = new class implements AuthAlertData {
    auth_data: { title_message: string; username: string, message: string };
    http_code: number;
    title: string;
  }

  constructor() { }

  ngOnInit(): void {
    this.auth_alert_data.title = '';
    this.auth_alert_data.http_code = 0;
    this.auth_alert_data.auth_data = {
      title_message: '',
      username: '',
      message: ''
    }
  }

  switch_component(component_id:number): void{
    this.component_id = component_id;
    this.hide_alert();
  }

  hide_alert():void{
    this.show_alert = false;
  }

  set_alert_data(auth_alert_data:AuthAlertData){
    this.show_alert = true;
    this.auth_alert_data = auth_alert_data;
  }

}
