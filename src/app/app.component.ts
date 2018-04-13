import {Component, ViewContainerRef} from '@angular/core';
import {ToastsManager} from "ng2-toastr";
import {AuthLocalStorage} from "../services/auth-local-storage.service";

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(
      toast:ToastsManager,
      vRef:ViewContainerRef,
      authLocalStorage: AuthLocalStorage
  ) {
    // всегда надо инжектить в корневой компонент
    if(authLocalStorage.isBrowser) toast.setRootViewContainerRef(vRef);
  }
}
