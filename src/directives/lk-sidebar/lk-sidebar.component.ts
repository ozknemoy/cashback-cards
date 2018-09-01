/**
 * Created by ozknemoy on 15.03.2018.
 * при focus на элемент применяется класс focus
 */
import {Component, Inject} from "@angular/core";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {HttpService} from "../../services/http.service";
import {BonusLevels, Card, User} from "../../app/profile/profile-settings.component";



@Component({
  selector: 'lk-sidebar',
  templateUrl: './lk-sidebar.component.html'
})
export class LkSidebarComponent {
  public isMobileMenuOpen = false;
  public isLoading = true;
  public followed = 0;
  public level = 1;
  public user: User = new User();
  public card: Card = new Card();
  public bonusLevels:BonusLevels[];
  public bonusLevelsForSlider:BonusLevels[];
  getProfile$$;

  constructor(public httpService: HttpService,
              @Inject('isArenasport') public isArenasport: boolean,
              public authLocalStorage: AuthLocalStorage) {
  }

  ngOnInit() {
    this.getProfile$$ = this.httpService.getRemoteProfile().subscribe((profile: any) => {
      this.isLoading = false;
      this.user = profile[0].User;
      this.card = profile[1].Card;

      this.httpService.getBonusLevels(this.card)
        .subscribe(({bonusLevels,bonusLevelsForSlider,followed,level}) => {
          this.bonusLevels = bonusLevels;
          this.bonusLevelsForSlider = bonusLevelsForSlider;
          this.followed = followed;
          this.level = level;
        });
    })
  }

}