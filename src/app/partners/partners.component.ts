/**
 * Created by ozknemoy on 13.04.2017.
 */
import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";

/*
/v1/shops/find-shop post {"ShopSearch":{XXXX}}
XXXX
  [['id', 'category', 'city_id', 'bonus_type'], 'integer'],
  [['name', 'address', 'metro'], 'safe'],
/v1/shops/get-shop?id=shopId*/
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

  constructor(public httpService: HttpService) {}

  ngOnInit() {
    this.httpService.post('shops/find-shop', {ShopSearch: null})
      .subscribe((partners: IPartner[]) => {
        this.partners = partners;
      })
  }


}