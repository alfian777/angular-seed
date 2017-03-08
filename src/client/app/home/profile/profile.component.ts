import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user.model';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit{

  private user : User;

  constructor(private userService: UserService) { }
  
  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: User) => this.user = user)  
  }

}
