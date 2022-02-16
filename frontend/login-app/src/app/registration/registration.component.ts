import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  router: Router;
  userService: UserService;
  confirmationMessage: string = '';
  spinner: boolean = false;
  disableForm: boolean = false;
  constructor(UserService: UserService, router: Router) {
    this.router = router;
    this.userService = UserService;
  }

  ngOnInit(): void {}

  async onSubmit(form:any) {
    let formData = form.form.value;
    this.spinner = true;
    this.disableForm = true;
    let output = {
      user_name: formData.userName,
      email: formData.email,
      password: formData.password
    }
    let response = await this.userService.registerUser(output);
    if (response.error) {
      this.disableForm = false;
      this.confirmationMessage = `Username or email already taken!`;
    }
    else {
      this.confirmationMessage = `Confirmation mail sent to ${formData.email}`;
      form.reset();
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 3000)
    }
    this.spinner = false;
  }



}
