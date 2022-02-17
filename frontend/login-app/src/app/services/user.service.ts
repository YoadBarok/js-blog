import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private backendUrl = environment.backendUrl

  constructor() {}

  getAccessToken() {
    let token = localStorage.getItem('jwtToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  setAccessToken(token: string) {
    localStorage.setItem('jwtToken', token)
  }

  async registerUser(user: any) {
    let result = await axios.post('http://localhost:3001/user/save-user', user);
    return result.data;
  }

  async login(user: any) {
    let result = await axios.post('http://localhost:3001/user/login', user);
    return result.data;
  }

  async identify() {
    this.getAccessToken();
    try {
      let result = await axios.get('http://localhost:3001/user/identify');
      return result.data[0];
    } catch (error) {
      let response = await this.refreshToken();
      this.setAccessToken(response.accessToken);
      return null
    }
  }

  async refreshToken() {
    let result = await axios.post('http://localhost:3001/user/token', {
      token: localStorage.getItem('refreshToken'),
    });
    return result.data;
  }
}
