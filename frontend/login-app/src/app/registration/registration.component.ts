import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  userService: UserService;
  constructor(UserService: UserService) {
    this.userService = UserService;
  }

  ngOnInit(): void {}




}
