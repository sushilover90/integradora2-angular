import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import {GetUrlService} from "../../services/get-url.service";
import {HttpClientService} from "../../services/http-client.service";
import {Router} from "@angular/router";
import {Activation} from "../../interfaces/activation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private ws:any;
  private iot_channel:any;
  public btn_active_servo_state = true;
  public btn_active_lectures_state = true;
  public distance:number = 0;
  public activations_lists:Array<Activation> = [];
  public real_time_feed:boolean = false;

  constructor(private httpClientService: HttpClientService,private router: Router) {

    const url:string = `${GetUrlService.get_api_url()}/token/verify`;

    this.httpClientService.makeRequest('get', url).subscribe(
        response => {
          this.start_socket_connection();
          this.get_activation_registers();
        },
        error => {
          console.log('invalid');
          this.router.navigate(['/']);
          return;
        }
    );

  }

  ngOnInit(): void {


  }

  start_servo():void{
    const event_data = {
      username: localStorage.getItem('username'),
      description: 'started servo'
    }
    this.iot_channel.emit('dispense',event_data);
    //this.btn_active_servo_state = false;
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

  private start_socket_connection():void{

    this.ws = Ws(GetUrlService.get_ws_url(),{
      path:'adonis-ws',
      reconnection: true
    });

    this.ws.connect();
    this.iot_channel = this.ws.subscribe('iot');

    this.iot_channel.on('message',message =>{
      console.log(message)
      /*this.check_servo_status(message);*/
    });

    this.iot_channel.on('reserve', reserve => {
      console.log(reserve);
    });

    this.iot_channel.on('dispense',data=>{
      console.log(data);
    });

    this.iot_channel.on('measure',data =>{
      this.distance = data.distance;
      console.log(data);
    });

    this.iot_channel.on('close',()=>{
      console.log('disconnected');
    });

    this.iot_channel.on('ready',()=>{
      console.log('ready');
    });

    this.iot_channel.on('send_activations',activations =>{
        this.check_real_time_feed(activations);
    })

  }

  get_activations_real_time():void{

    this.get_activation_registers();
    if(!this.real_time_feed){
      this.real_time_feed = true;
      this.btn_active_lectures_state = false;
      return;
    }

    this.btn_active_lectures_state = true;
    this.real_time_feed = false;
  }

  get_activation_registers():void{

    const url:string = `${GetUrlService.get_api_url()}/registers/getlectures`;

    this.httpClientService.makeRequest('get',url)
        .subscribe(
            response => this.activations_lists = response[0].activations
        )
  }

  check_real_time_feed(activations):void{
    if(!this.real_time_feed){
      return;
    }
    this.activations_lists = activations[0].activations;
}

}
