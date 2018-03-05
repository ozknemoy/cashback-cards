import {NgModule, Component, Inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-lazy-view',
  template: `<h3>{{orders}}/ {{orders?.need_bonus}}</h3>`
})
export class LazyComponent {
  orders;
  constructor(
      public http: HttpService
  ) {}

  ngOnInit() {
    this.http.get('bonuses/orders?year=2018&month=3')
        .toPromise()
        .then((orders)=> {this.orders = orders})
  }
}

@NgModule({
  declarations: [LazyComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: LazyComponent, pathMatch: 'full'}
    ])
  ]
})
export class LazyModule {

}
