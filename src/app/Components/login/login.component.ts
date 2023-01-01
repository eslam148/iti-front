import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { IUserLogIn} from 'src/app/Model/IUserLogIn';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private AuthService: AuthService,private router: Router) {}

  login(info: IUserLogIn) {
    console.log(info);
    this.AuthService.login(info).subscribe();
  }

}
