import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAuthenticationComponent} from "./components/user-authentication/user-authentication.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";


const routes: Routes = [
  {
    path:'',
    component: UserAuthenticationComponent
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    redirectTo: 'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
