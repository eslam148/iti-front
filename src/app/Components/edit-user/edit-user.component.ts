import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IUserRegister} from 'src/app/Model/IUserLogIn';
import {AuthService} from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  constructor(
    private AuthService: AuthService,
    private router: Router
  ) {}
  Edit(UserInfo: IUserRegister) {
    const item = window.localStorage.getItem('user');
    UserInfo.id = this.loadUserInfo().id;
    this.AuthService.EditUser(UserInfo).subscribe((user) =>{
      this.AuthService.logout();
      window.location.reload();
      this.router.navigate(['/login']);
    }
    );
  }
  loadUserInfo() {
    const item = window.localStorage.getItem('user');
    return item ? JSON.parse(item) : [];
  }
}
