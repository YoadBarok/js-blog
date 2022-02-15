import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

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

  async onSubmit(form:any) {

    let output = {
      user_name: form.form.value.userName,
      email: form.form.value.email,
      password: form.form.value.password
    }
    this.userService.registerUser(output);
  }



}
