import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";

interface IHistory {
  date: string,
  description: string,
  amount: number,
  trans: number
}

@Component({
  selector: 'profile-history-view',
  templateUrl: 'profile-history.component.html'
})
@AutoUnsubscribe()
export class ProfileHistoryView {
  public bsRangeValue: Date[] = [null, null];
  public currentPage = 1;
  public hist;
  public filter = {
    type: null
  };

  public history: IHistory[] = [
    {date: '2018-04-01', description: 'Назначение платежа', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение ', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение платежа', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение ', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение платежа', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение ', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение платежа', amount: 45645674, trans: 4545},
    {date: '2018-01-15', description: 'Назначение ', amount: 45645674, trans: 4545},
    {date: '2017-11-15', description: 'Назначение платежа', amount: 45645674, trans: 4545},
    {date: '2017-09-15', description: 'Назначение ', amount: 45645674, trans: 4545},
    {date: '2017-01-15', description: 'Назначение платежа', amount: 45645674, trans: 4545},
  ];
  public historyRanged: IHistory[];

  constructor(
    public httpService: HttpService,
    public HandleDataService: HandleDataService
  ) {

  }

  ngOnInit() {
    this.historyRanged = this.history
  }

  onDateRangeChange() {
    this.currentPage = 1;

  }

}