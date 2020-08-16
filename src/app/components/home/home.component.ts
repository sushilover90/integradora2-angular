import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import {GetUrlService} from "../../services/get-url.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ws:any;
  servo_channel:any;

  constructor() {

  }

  ngOnInit(): void {

    this.ws = Ws(GetUrlService.get_ws_url(),{
      path:'adonis-ws'
    });

    this.ws.connect();
    this.servo_channel = this.ws.subscribe('servo');

    this.servo_channel.on('message',message =>{
      console.log(message);
    });

    this.servo_channel.on('reserve', reserve => {
      console.log(reserve);
    });

    this.servo_channel.on('dispense',data=>{
      console.log(data);
    })

  }

  // for testing
  send_message():void{
    this.servo_channel.emit('message','hola');
  }

  // for testing
  send_reserve():void{
    this.servo_channel.emit('reserve','reserved');
  }

  start_servo():void{
    this.servo_channel.emit('dispense','started servo');
  }

}
