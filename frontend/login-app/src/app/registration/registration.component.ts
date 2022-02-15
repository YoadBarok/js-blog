import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  userService: UserService;
  confirmationMessage: string = '';
  spinner: boolean = false;
  constructor(UserService: UserService) {
    this.userService = UserService;
  }

  ngOnInit(): void {}

  async onSubmit(form:any) {
    this.spinner = true;
    let output = {
      user_name: form.form.value.userName,
      email: form.form.value.email,
      password: form.form.value.password
    }
    let response = await this.userService.registerUser(output);
    if (response.error) {
      this.confirmationMessage = `Username or email already taken!`;
    }
    else {
      this.confirmationMessage = `Confirmation mail sent to ${form.form.value.email}`;
    }
    this.spinner = false;
    setTimeout(() => {
      this.confirmationMessage = '';
    }, 3000)
  }



}
