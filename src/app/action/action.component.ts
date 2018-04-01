import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";
import {ActivatedRoute} from "@angular/router";
import {IPartner} from "../partners/partners.component";


@Component({
  selector: 'action-view',
  templateUrl: 'action.component.html'
})
@AutoUnsubscribe()
export class ActionView {
  public action: IPartner;
  private get$$;

  constructor(
    private httpService: HttpService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.get$$ = this.httpService.get(`shops/get-shop?id=${this.route.snapshot.params.id}`)
      .subscribe((action: IPartner) => {
        this.action = action;
      })
  }


}