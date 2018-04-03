import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import {HttpClientModule} from "@angular/common/http";
import {LocalStorage} from "../services/localStorage.service";
import {HttpService} from "../services/http.service";
import {vendorModules} from "./vendor.modules";
import {SharedService} from "../services/shared.service";
import {scrollToFactory} from "../services/scroll-to.factory";
import {DirectiveModule} from "./directive.modules";
import {UAService} from "../services/user-agent.service";
import {AuthGuard} from "../services/auth-guard.service";
import {TranslateService} from "@ngx-translate/core";
import {soccer} from "../locales/soccer";
import {crimea} from "../locales/crimea";
import {LkSidebarComponent} from "../directives/lk-sidebar/lk-sidebar.component";
import {HandleDataService} from "../services/handle-data.service";
import {routes, routesComponent} from "../config/router";
import {PipeModule, pipes} from "../pipes";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {BsDaterangepickerConfig, BsLocaleService} from "ngx-bootstrap";
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ruLocale } from 'ngx-bootstrap/locale';
/*import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';*/



@NgModule({
  declarations: [
    routesComponent,

    LkSidebarComponent,
  ],
  imports: [
    PipeModule,
    vendorModules,
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot(<any>routes),
    HttpClientModule,
    TransferHttpCacheModule,
    DirectiveModule

  ],
  providers: [
    SharedService,
    LocalStorage,
    HttpService,
    UAService,
    AuthGuard,
    HandleDataService,
    {provide: 'phoneMask', useValue: '+7(000)000-0000'},
    /*{ provide: LOCALE_ID, useValue: 'ru' }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    translate: TranslateService,
    bsDatepickerConfig: BsDatepickerConfig,
    bsDaterangepickerConfig: BsDaterangepickerConfig,
    localeService: BsLocaleService,
  ) {
    translate.setDefaultLang('soccer');
    translate.setTranslation('soccer', soccer);
    translate.setTranslation('crimea', crimea);
    translate.use('soccer');

    // datepicker
    defineLocale('ru', ruLocale);
    localeService.use('ru');
    bsDatepickerConfig.dateInputFormat = 'DD/MM/YYYY';
    bsDatepickerConfig.rangeInputFormat = 'DD/MM/YYYY';
    bsDatepickerConfig.showWeekNumbers = false;
    bsDaterangepickerConfig.rangeInputFormat = 'DD/MM/YYYY';
    bsDaterangepickerConfig.dateInputFormat = 'DD/MM/YYYY';
    bsDaterangepickerConfig.showWeekNumbers = false;


    //registerLocaleData(localeRu);
  }
}
