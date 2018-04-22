import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {IPartner} from "../partners/partners.component";
import {SeoService} from "../../services/seo.service";


@Component({
  selector: 'partner-view',
  templateUrl: 'partner.component.html'
})
@AutoUnsubscribe()
export class PartnerView {
  public partner: IPartner;
  private get$$;
  public id = this.route.snapshot.params.id;
  constructor(private httpService: HttpService,
              private seoService: SeoService,
              private route: ActivatedRoute,) {


  }

  ngOnInit() {
    this.seoService.handleOne('main.shop.' + this.id);
    this.get$$ = this.httpService.get(`shops/get-shop?id=${this.id}`).subscribe((partner: IPartner) => {
        this.partner = partner;
      })
  }


}