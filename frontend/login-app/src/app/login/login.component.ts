import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  disableForm: boolean = false;
  spinner:boolean = false;
  confirmationMessage:string = ''
  userService:UserService;
  router: Router;

  constructor(userService:UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }


  ngOnInit(): void {}

  async onSubmit(form: any) {
    let data = form.form.value;
    let user = {
      user_name: data.userName,
      password: data.password
    }
    let response = await this.userService.login(user);
    if (response.error) {
      this.confirmationMessage = response.error;
      }
    else {
      localStorage.setItem('jwtToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      this.router.navigate(['/success'])
    }
    }
}
