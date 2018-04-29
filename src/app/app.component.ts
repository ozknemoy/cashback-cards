import {Component, ElementRef, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {AuthLocalStorage} from "../services/auth-local-storage.service";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
    private toast:ToastsManager,
    private router: Router,
    private vRef:ViewContainerRef,
    private authLocalStorage: AuthLocalStorage
  ) {
    if(authLocalStorage.isBrowser) {
      // всегда надо инжектить в корневой компонент
      toast.setRootViewContainerRef(vRef);

      this.router.events.subscribe((event) => {
        //console.log('---', event);
        if (event instanceof NavigationStart) {
          // если в урле якоря нет
          if(event.url.indexOf('#') === -1) {
            document.body.scrollTop = document.documentElement.scrollTop = 0
          }

        }
      });
    }
  }

}
