
import {Component} from "@angular/core";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";

@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html'
})
export class NavHeaderComponent {
  public isMobileMenuOpen = false;

  constructor(
    public authLocalStorage: AuthLocalStorage
  ) {}

}