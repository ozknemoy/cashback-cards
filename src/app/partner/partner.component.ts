import {Component, Inject} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {SeoService} from "../../services/seo.service";
import {IPartner} from "../partners/partner.model";
import {BASE_URL_IMG} from "../../config/base_url";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";


@Component({
  selector: 'partner-view',
  templateUrl: 'partner.component.html'
})
@AutoUnsubscribe()
export class PartnerView {
  public partner = new IPartner();
  public daysKeys: string[] = [];
  private get$$;
  public isBrowser: boolean;
  public id = this.route.snapshot.params.id;
  public BASE_URL_IMG = BASE_URL_IMG;

  constructor(
    @Inject('isArenasport') public isArenasport: boolean,
    private httpService: HttpService,
    public authLocalStorage:AuthLocalStorage,
    private seoService: SeoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isBrowser = this.authLocalStorage.isBrowser;
    this.seoService.handleOne('main.shop.' + this.id);
    this.get$$ = this.httpService.get(`shops/get-shop?id=${this.id}`).subscribe((partner: IPartner) => {
      partner.lon = <any>parseFloat(partner.lon);
      partner.lat = <any>parseFloat(partner.lat);
      this.daysKeys = Object.keys(partner.working_time);
      this.partner = partner;
    })
  }


}