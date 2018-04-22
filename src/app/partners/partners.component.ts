/**
 * Created by ozknemoy on 13.04.2017.
 */
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {publicDecrypt} from "crypto";
import {SeoService} from "../../services/seo.service";

/*
/v1/shops/find-shop post {"ShopSearch":{XXXX}}
XXXX
  [['id', 'category', 'city_id', 'bonus_type'], 'integer'],
  [['name', 'address', 'metro'], 'safe'],
/v1/shops/get-shop?id=shopId
/v1/handbooks/cities
/v1/handbooks/shop-categories
*/

export interface Category {
  id: number;
  name: string;
}

export interface City {
  id: number;
  name: string;
  spx_id: number;
  country_id: number;
  region_id: number;
  lat: string;
  lon: string;
}

export interface IPartner {
  id: number;
  name: string;
  category: Category;
  city: City;
  bonus_type: number;
  address: string;
  metro: string;
  about?: string;
  working_time?: any;
  lat: string;
  lon: string;
  phone: string;
  image: string;
}

enum Type {
  Map = 'map',
  List = 'list',
}

@Component({
  selector: 'partners-view',
  templateUrl: 'partners.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
@AutoUnsubscribe()
export class PartnersView {
  public categories: Category[];
  public partners: IPartner[];
  public _partners: IPartner[] = [];
  public type = Type.List;
  public Type = Type;
  public filter = {
    category: {id: null},
    metro: null
  };

  constructor(public httpService: HttpService, public seoService: SeoService) {}

  ngOnInit() {
    this.seoService.handleOne('main.shop');
    this.httpService.get('handbooks/shop-categories').subscribe(cat=> this.categories = cat);
    this.httpService.post('shops/find-shop', {ShopSearch: null})
      .subscribe((partners: IPartner[]) => {
        this.partners = partners.map(p=> {
          p.lon = <any>parseFloat(p.lon);
          p.lat = <any>parseFloat(p.lat);
          return p
        });
        this._partners = partners
      })
  }

  onBoundsChange({ne,sw}) {
    this._partners = this.getFromRectangle(this.partners, ne, sw);
  }

  getFromRectangle(points,ne,sw) {
    return points.filter(point=> point.lon >= sw[1] && point.lon <= ne[1] && point.lat >= sw[0] && point.lat <= ne[0])
  }

}