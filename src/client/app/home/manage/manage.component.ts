import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user/user.service';
import { User } from '../../shared/user/user.model';

@Component({
  moduleId: module.id,
  templateUrl: 'manage.component.html',
  styleUrls: ['manage.component.css']
})
export class ManageComponent implements OnInit {

  private user : User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: User) => this.user = user)
  }

}