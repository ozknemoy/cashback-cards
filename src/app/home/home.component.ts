import {Component, Inject} from '@angular/core';

import {HttpService} from "../../services/http.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {SeoService} from "../../services/seo.service";
import {HomeCommonComponent} from "./home-common.class";

@Component({
  selector: 'app-home',
  template: `
    <div class="wrap" [addClassAfterScroll]="50">
      <nav-header></nav-header>
      <arenasport-home *ngIf="isArenasport; else isCrimea"></arenasport-home>
      <ng-template #isCrimea><crimea-home></crimea-home></ng-template>
    </div>
    <app-footer></app-footer>
  `
})
export class HomeComponent {
  constructor(@Inject('isArenasport') public isArenasport: boolean) {}
}

@Component({
  selector: 'arenasport-home',
  templateUrl: './arenasport-home.component.html'
})
export class ArenasportHomeComponent extends HomeCommonComponent {
  constructor(
    protected httpService: HttpService,
    public authLocalStorage: AuthLocalStorage,
    public seoService: SeoService,
    @Inject('isArenasport') public isArenasport: boolean
  ) {
    super(httpService, authLocalStorage, seoService);
  }
}

@Component({
  selector: 'crimea-home',
  templateUrl: './crimea-home.component.html'
})
export class CrimeaHomeComponent extends HomeCommonComponent {
  constructor(
    protected httpService: HttpService,
    public authLocalStorage: AuthLocalStorage,
    public seoService: SeoService
  ) {
    super(httpService, authLocalStorage, seoService);
  }
}
