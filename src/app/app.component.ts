import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {LocalStorage} from "../services/localStorage.service";

@Component({
  selector: 'app-root',
  template: `
  <a routerLink="/">Home</a>
  <a routerLink="/registration">regs</a>
  <a routerLink="/restore-password">restore</a>
  <a routerLink="/supplier">supplier</a>
  <a routerLink="/suppliers">suppliers</a>
  <a routerLink="/geo">geo</a>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
      toast:ToastsManager,
      vRef:ViewContainerRef,
      localStorage: LocalStorage
  ) {
    // всегда надо инжектить в корневой компонент
    if(localStorage.isBrowser) toast.setRootViewContainerRef(vRef);
  }
}
