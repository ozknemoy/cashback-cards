import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";



@Component({
  selector: 'profile-main-view',
  templateUrl: 'profile-main.component.html'
})
@AutoUnsubscribe()
export class ProfileMainView {


  constructor(
    public httpService: HttpService,
    public HandleDataService: HandleDataService
  ) {
  }

  ngOnInit() {

  }

}