import { Component } from '@angular/core';
import {IUserInfo} from 'src/app/Model/IUserLogIn';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css'],
})
export class UserSettingComponent {
  userInfo!: IUserInfo
  constructor() {
    this.userInfo = this.loadUserInfo();
    console.log(this.userInfo);
  }
  loadUserInfo() {
    const item = window.localStorage.getItem('user');

    return item ? JSON.parse(item) : [];
  }
}
