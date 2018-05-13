import {Component, Inject} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";
import {BonusLevels, Card, User} from "./profile-settings.component";
import {IPartner} from "../partners/partner.model";



@Component({
  selector: 'profile-main-view',
  templateUrl: 'profile-main.component.html'
})
@AutoUnsubscribe()
export class ProfileMainView {
  public semiFilledProfile = true;
  public partners: IPartner[] = [];
  public isLoading = true;
  public user: User = new User;
  public card: Card = new Card;
  public followed = 0;
  public level = 1;
  public bonusLevels:BonusLevels[];
  getProfile$$;

  constructor(
    public httpService: HttpService,
    @Inject('isArenasport') public isArenasport: boolean,
    public HandleDataService: HandleDataService
  ) {
  }

  ngOnInit() {
    this.getProfile$$ = this.httpService.getRemoteProfile().subscribe((profile: any) => {
      this.user = profile[0].User;
      this.card = profile[1].Card;
      this.checkProfileFillness();
      this.httpService.getBonusLevels(this.card).first().subscribe(({bonusLevels,followed,level}) => {
        this.bonusLevels = bonusLevels;
        this.followed = followed;
        this.level = level;
        this.isLoading = false;
      });
      this.httpService.post('shops/find-shop', {ShopSearch: null})
        .subscribe((partners: IPartner[]) => {
          this.partners = partners.slice(0,3)
        })
    })
  }

  checkProfileFillness():boolean {
    for(let k in this.user) {
      if(!this.user[k]) return this.semiFilledProfile = true;
    }
    return this.semiFilledProfile = false;
  }

}