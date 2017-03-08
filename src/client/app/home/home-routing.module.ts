import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

// Children
import { AboutComponent } from './about/about.component';
import { GreetComponent } from './greet/greet.component';
import { ManageComponent } from './manage/manage.component';
import { ProfileComponent } from './profile/profile.component';
import { SmartComponent } from './smart/smart.component';

// Service
import { AuthGuard }      from '@sharedmodule/guard/auth-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { 
        path: 'admin', component: HomeComponent, canActivate: [AuthGuard],
        children :[
          { path: 'greet',   component: GreetComponent },
          { path: 'about'  , component: AboutComponent },
          { path: 'manage' , component: ManageComponent }, // Becoming Big Enough lets use module instead
          //{ path: 'manage' , loadChildren: () => ManageModule },
          { path: 'profile', component: ProfileComponent },
          { path: 'smart'  , component: SmartComponent },
          { path: '',   redirectTo: 'greet', pathMatch: 'full' },
        ] 
      }
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
