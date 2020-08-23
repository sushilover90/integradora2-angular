import { Component, OnInit } from '@angular/core';
import Ws from '@adonisjs/websocket-client';
import {GetUrlService} from "../../services/get-url.service";
import {HttpClientService} from "../../services/http-client.service";
import {Router} from "@angular/router";
import {Activation} from "../../interfaces/activation";
import {markAsyncChunksNonInitial} from "@angular-devkit/build-angular/src/angular-cli-files/utilities/async-chunks";

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
  public distance:string = 'Pendiente...';
  public activations_lists:Array<Activation> = [];
  public real_time_feed:boolean = false;
  public servo_status:string  = 'Apagado';
  public authenticated:boolean = false;

  constructor(public httpClientService: HttpClientService,public router: Router) {

    const url:string = `${GetUrlService.get_api_url()}/token/verify`;

    this.httpClientService.makeRequest('get', url).subscribe(
        response => {
          this.authenticated = true;
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
      this.check_servo_status(message);
    });

    this.iot_channel.on('reserve', reserve => {
      console.log(reserve);
    });

    this.iot_channel.on('dispense',data=>{
      console.log(data);
    });

    this.iot_channel.on('measure',data =>{
      console.log(data);
      const distance:number = parseFloat(data.distance);
      if(distance>=13){
        this.distance  = 'Vacio';
      }
      this.distance  = 'Lleno';
    });

    this.iot_channel.on('close',()=>{
      console.log('disconnected');
    });

    this.iot_channel.on('ready',()=>{
      console.log('ready');
    });

    this.iot_channel.on('send_activations',activation =>{
        this.check_real_time_feed(activation);
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

  check_servo_status(message:any){
    if(message.servo_active === true){
      console.log('llego aquí message.servo_active === true')
      this.servo_status = 'Encendido';
      this.btn_active_servo_state = false;
      return;
    }

    console.log('llego aquí !message.servo_active')
    this.servo_status = 'Apagado';
    this.btn_active_servo_state = true;

  }

  check_real_time_feed(activation):void{
    console.log(activation)
    if(!this.real_time_feed){
      return;
    }
    this.activations_lists.unshift(activation);
  }

  


}
