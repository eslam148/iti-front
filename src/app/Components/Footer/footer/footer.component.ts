import { Component } from '@angular/core';
import {loginState} from 'src/app/Model/IUserLogIn';
import {AuthService} from '../../../Services/auth.service'
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  loggedIn!: loginState;
  constructor(private AuthService: AuthService) {
     this.AuthService.flag.subscribe((f: loginState) => (this.loggedIn = f));
  }
}
