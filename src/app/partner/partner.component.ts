import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {IPartner} from "../partners/partners.component";


@Component({
  selector: 'partner-view',
  templateUrl: 'partner.component.html'
})
@AutoUnsubscribe()
export class PartnerView {
  public partner: IPartner;
  private get$$;

  constructor(private httpService: HttpService,
              private route: ActivatedRoute,) {


  }

  ngOnInit() {
    this.get$$ = this.httpService.get(`shops/get-shop?id=${this.route.snapshot.params.id}`)
      .subscribe((partner: IPartner) => {
        this.partner = partner;
      })
  }


}