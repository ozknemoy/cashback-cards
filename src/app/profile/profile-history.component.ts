import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {HandleDataService} from "../../services/handle-data.service";

interface IHistory {
  id: number;
  shop_id: number;
  type: number;
  description: string;
  amount: string;
  created_at: string;
  updated_at: string;
  status: number;
  external_id: number;
  from?: any;
  to?: any;
  card_id: number;
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
    type: ''
  };
  public history: IHistory[] = [];

  constructor(
    public httpService: HttpService,
    public HandleDataService: HandleDataService
  ) {

  }

  ngOnInit() {
    this.httpService.get('profiles/get-payments').subscribe(history=> {
      this.history = history;
    })
  }

  onDateRangeChange() {
    this.currentPage = 1;
  }

}