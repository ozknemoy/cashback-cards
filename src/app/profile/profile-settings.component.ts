import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";

/*
Fynjy, [27.03.18 16:50]
[['','surname','patronymic'],'string','max'=>255,'on'=>'user_edit'],
['birthday','string','max'=>10,'on'=>'user_edit'],
['email','email','on'=>'user_edit'],
['gender','integer','on'=>'user_edit']*/
interface IUser {
  name: string,
  surname: string,
  patronymic: string,
  birthday: string,
  _birthday: Date,
  email: string,
  phone: string,
  gender: number,
}

interface ICard {
  number: number,
  points: number,
  self_points: number,
  status: number,
}

@Component({
  selector: 'profile-settings-view',
  templateUrl: 'profile-settings.component.html'
})
@AutoUnsubscribe()
export class ProfileSettingsView {
  public user:IUser = {
    name: null,
    surname: null,
    patronymic: null,
    birthday: null,
    _birthday: null,
    email: null,
    phone: null,
    gender: null,
  };
  public card:ICard = {
    number : null,
    points: null,
    self_points: null,
    status: null,
  };

  constructor(
    public httpService: HttpService,
    public HandleDataService: HandleDataService
  ) {
  }

  ngOnInit() {
    this.httpService.get('profiles/main').subscribe((profile: any) => {
      this.user = profile[0].User;
      this.user._birthday = this.HandleDataService.dateFromServer(this.user.birthday);
      this.card = profile[1].Card;
    })
  }

  save() {
    this.user.birthday = this.HandleDataService.dateToServer(this.user._birthday);
    console.log(this.user);
    this.httpService.postWithToast('profiles/main', {User: this.user}).subscribe(profile => {

    })
  }

}