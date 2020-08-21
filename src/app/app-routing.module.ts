import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAuthenticationComponent} from "./components/user-authentication/user-authentication.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {VerifyTokenGuard} from "./guards/verify-token.guard";
import {ActivationsListComponent} from "./components/activations-list/activations-list.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";


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
    path:'activations',
    component: ActivationsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'**',
    component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
