import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import {GetUrlService} from "../../services/get-url.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private ws:any;
  private servo_channel:any;
  public btn_active_servo_state = true
  public distance:number = 0

  constructor() {

  }

  ngOnInit(): void {

    this.ws = Ws(GetUrlService.get_ws_url(),{
      path:'adonis-ws'
    });

    console.log('has on measure');

    this.ws.connect();
    this.servo_channel = this.ws.subscribe('servo');

    this.servo_channel.on('message',message =>{
      console.log(message)
      this.check_servo_status(message);
    });

    this.servo_channel.on('reserve', reserve => {
      console.log(reserve);
    });

    this.servo_channel.on('dispense',data=>{
      console.log(data);
    });

    this.servo_channel.on('measure',data =>{
      this.distance = data.distance;
      console.log(data);
    });

  }

  start_servo():void{
    this.servo_channel.emit('dispense','started servo');
    this.btn_active_servo_state = false;
  }

  check_servo_status(message:any){
    if(!message.servo_active){
      this.btn_active_servo_state = true;
      return;
    }

    if(message.servo_active === true){
      this.btn_active_servo_state = false;
      return;
    }

  }

}
