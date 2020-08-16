import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAuthenticationComponent} from "./components/user-authentication/user-authentication.component";
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {
    path:'',
    component: UserAuthenticationComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'**',redirectTo:''
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
