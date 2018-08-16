import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {NgForm} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";

/*
Fynjy, [27.03.18 16:50]
[['','surname','patronymic'],'string','max'=>255,'on'=>'user_edit'],
['birthday','string','max'=>10,'on'=>'user_edit'],
['email','email','on'=>'user_edit'],
['gender','integer','on'=>'user_edit']*/

export class User {
  name: string = null;
  surname: string = null;
  patronymic: string = null;
  birthday: string = null;
  _birthday: Date = null;
  email: string = null;
  phone: string = null;
  gender: number = null;
}
export class BonusLevels {
  id: number = null;
  name: string = null;
  amount_from: number = null;
  amount_to: number = null;
  percent: number = null;//сколько кешбека он получает
}

export class Card {
  points: number = null;//Баланс баллов
  self_points: number = null;// сумма покупок по карте
  status: BonusLevels = new BonusLevels();
  number: number = null;// номер карты
  fullNumber: string = null;// номер карты
  bonus_amount: number = null;// текущая сумма в статусе
}


@Component({
  selector: 'profile-settings-view',
  templateUrl: 'profile-settings.component.html'
})
@AutoUnsubscribe()
export class ProfileSettingsView {
  public user: User = new User;
  public card: Card = new Card;
  setProfile$$;
  getProfile$$;

  constructor(
    public httpService: HttpService,
    public authLocalStorage: AuthLocalStorage,
    public toast: ToastsManager,
    public HandleDataService: HandleDataService
  ) {
  }

  ngOnInit() {
    this.getProfile$$ = this.httpService.getRemoteProfile()/*.first()*/.subscribe((profile: any) => {
      this.user = profile[0].User;
      this.user._birthday = this.HandleDataService.dateFromServer(this.user.birthday);
      this.card = profile[1].Card;
    })
  }

  tryToSave(userForm: NgForm) {
    if(userForm.invalid) return this.toast.error('','Заполнены не все поля');

    this.user.birthday = this.HandleDataService.dateToServer(this.user._birthday);
    this.setProfile$$ = this.httpService.postWithToast('profiles/main', {User: this.user}).subscribe(profile => {
      this.authLocalStorage.setAuth(this.user, ['name', 'surname', 'patronymic'])
    })
  }

}