/**
 * Created by ozknemoy on 13.04.2017.
 */
import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";

/*Fynjy, [29.03.18 19:04]
/v1/shops/find-shop post {"ShopSearch":{XXXX}}
XXXX
  [['id', 'category', 'city_id', 'bonus_type'], 'integer'],
  [['name', 'address', 'metro'], 'safe'],

  Fynjy, [29.03.18 19:15]
/v1/shops/get-shop?id=shopId

  Fynjy, [29.03.18 19:16]
Первый возвращает список, второй конкретный магазин*/
export interface IPartner {
  id: number,
  category: number,
  city_id: number,
  bonus_type: number,
  name: string,
  address: string,
  metro: string,
}

@Component({
    selector: 'partners-view',
    templateUrl: 'partners.component.html'
})
@AutoUnsubscribe()
export class PartnersView {
  partners: IPartner[];

    constructor(
        public httpService: HttpService
    ) {
        this.httpService.post('shops/find-shop', {ShopSearch:null})
          .subscribe((partners: IPartner[]) => {
            this.partners = partners;
          })

    }




}