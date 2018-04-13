/**
 * Created by ozknemoy on 15.03.2018.
 * при focus на элемент применяется класс focus
 */
import {Component} from "@angular/core";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";
import {BonusLevels, Card, User} from "../../app/profile/profile-settings.component";

@Component({
  selector: 'lk-sidebar',
  templateUrl: './lk-sidebar.component.html'
})
export class LkSidebarComponent {

  public isLoading = true;
  public followed = 0;
  public level = 1;
  public user: User = new User();
  public card: Card = new Card();
  public bonusLevels:BonusLevels[];
  getProfile$$;
  constructor(public httpService: HttpService,
              public HandleDataService: HandleDataService,
              public authLocalStorage: AuthLocalStorage) {
    console.log(typeof authLocalStorage.auth.data.name);
  }

  ngOnInit() {

    this.getProfile$$ = this.httpService.getRemoteProfile().subscribe((profile: any) => {
      this.isLoading = false;
      this.user = profile[0].User;
      this.card = profile[1].Card;

      this.httpService.getBonusLevels(this.card).subscribe(({bonusLevels,followed,level}) => {
        this.bonusLevels = bonusLevels;
        this.followed = followed;
        this.level = level;
      });
    })
  }

}