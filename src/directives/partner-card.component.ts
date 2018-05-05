
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Component, ElementRef, Input} from "@angular/core";
import {IPartner} from "../app/partners/partner.model";
import {BASE_URL_IMG} from "../config/base_url";

@Component({
  selector : 'partner-card',
  template: `
    <a routerLink="/partner/{{partner.id}}" class="lk_promotions--item">
      <span class="lk_promotions--img"><img src="{{BASE_URL_IMG + partner.image}}" alt=""></span>
      <span class="lk_promotions--footer">
        <span class="lk_promotions--title">{{partner.name}}</span>
        <span class="lk_promotions--category">{{partner.category.name}}</span>
        <span class="lk_promotions--address">
          <span class="icon ic-metro"></span>{{partner.metro}}
        </span>
        <span class="lk_promotions--ic">
          <span class="icon ic-pay"
                *ngIf="partner.payment_type === 1 || partner.payment_type === 3"
                tooltip="Потратить баллы">
          </span>
          <span class="icon ic-collect"
                *ngIf="partner.payment_type === 0 || partner.payment_type === 3"
                tooltip="Получить баллы">
          </span>
          <span class="badge badge-success" *ngIf="partner.bonus_type">акция</span>
        </span>
      </span>
    </a>
  `
})
export class PartnerCardComponent{
  @Input() public partner = new IPartner();
  public BASE_URL_IMG = BASE_URL_IMG;

  constructor(private el: ElementRef) {}

}
