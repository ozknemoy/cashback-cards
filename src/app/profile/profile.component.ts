import {Component} from '@angular/core';


@Component({
  selector: 'profile-view',
  template: `
    <div class="wrap">
      <div class="lk">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-3">
              <lk-sidebar></lk-sidebar>
            </div>
            <div class="col-12 col-md-9">
              <router-outlet></router-outlet>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileView {}