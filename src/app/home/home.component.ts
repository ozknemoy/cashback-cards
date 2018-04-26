import {Component, OnInit, Inject} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {SeoService} from "../../services/seo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;
  public users: any;
  public reklamaUrl = 'ya.ru';//window.location.host;
  public adminH1 = '«Арена» — это карта болельщика, которая дает возможность оказаться в центре спортивных событий на самых выгодных условиях! ';

  constructor(
      private httpService: HttpService,
      public authLocalStorage: AuthLocalStorage,
      public seoService: SeoService
  ) {

  }

  ngOnInit() {
    /*this.httpService.globalGet('https://api.github.com/users').toPromise().then(d=> {
      this.users = d
    });*/
    this.seoService.handleOne('main')
  }


}

