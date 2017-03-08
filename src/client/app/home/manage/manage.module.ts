import { NgModule } from '@angular/core';
//import { HomeComponent } from './home.component';
//import { HomeRoutingModule } from './home-routing.module';
//import { SharedModule } from '@sharedmodule'; 
import { SharedModule } from '../../shared/shared.module';

// Child component
/*
import { AboutComponent }   from './about/about.component';
import { GreetComponent }   from './greet/greet.component';
import { ManageComponent }  from './manage/manage.component';
import { ProfileComponent } from './profile/profile.component';
import { SmartComponent }   from './smart/smart.component';
*/
@NgModule({
  imports: [SharedModule],
  /*
  declarations: [
    HomeComponent,AboutComponent,GreetComponent,
    ManageComponent,ProfileComponent,SmartComponent
    ]
    */
  //exports: [HomeComponent]
})
export class ManageModule { }