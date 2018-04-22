import {Component} from '@angular/core';
import {AuthLocalStorage} from "../../services/auth-local-storage.service";


@Component({
  selector: 'profile-view',
  template: `
    <div class="wrap">
      <div class="lk">
        <div class="header">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-3">
                <a routerLink="/" class="logo"></a>
              </div>
              <div class="col-12 col-md-9 text-right">
                <button (click)="authLocalStorage.logout()" class="btn btn-neutral btn-simple btn-logout">Выйти</button>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-4 col-lg-3">
              <lk-sidebar></lk-sidebar>
            </div>
            <div class="col-12 col-md-8 col-lg-9 z0">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileView {
  constructor(public authLocalStorage : AuthLocalStorage) {}
}