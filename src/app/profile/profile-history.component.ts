import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";

interface IHistory {

}

@Component({
  selector: 'profile-history-view',
  templateUrl: 'profile-history.component.html'
})
@AutoUnsubscribe()
export class ProfileHistoryView {
  public bsRangeValue: Date[];
  public history: IHistory[] = [
    {date: '2018-01-15', text: 'Назначение платежа', sum: 45645674, trans: 4545}
  ];


  constructor(
    public httpService: HttpService,
    public HandleDataService: HandleDataService
  ) {
  }

  ngOnInit() {

  }

}