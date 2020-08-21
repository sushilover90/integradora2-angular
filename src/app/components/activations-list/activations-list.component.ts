import { Component, OnInit } from '@angular/core';
import {HttpClientService} from "../../services/http-client.service";
import {Router} from "@angular/router";
import {GetUrlService} from "../../services/get-url.service";
import {Activation} from "../../interfaces/activation";

@Component({
  selector: 'app-activations-list',
  templateUrl: './activations-list.component.html',
  styleUrls: ['./activations-list.component.css']
})
export class ActivationsListComponent implements OnInit {

  public activations_lists:Array<Activation> = [];
  public real_time_feed:boolean = false;

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit(): void {

    const url:string = `${GetUrlService.get_api_url()}/token/verify`;

    this.httpClientService.makeRequest('get',url)
        .subscribe(
            response => this.get_activation_registers(),
            error => this.router.navigate(['/'])
        );
  }

  get_activation_registers():void{

    const url:string = `${GetUrlService.get_api_url()}/token/getlectures`;

    this.httpClientService.makeRequest('get',url)
        .subscribe(
            response => this.activations_lists = response[0].activations
        )
  }

}
