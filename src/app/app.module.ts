import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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


@NgModule({
  declarations: [
    routesComponent,

    LkSidebarComponent,
  ],
  imports: [
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
    {provide: 'phoneMask', useValue: '+7(000)000-0000'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(translate: TranslateService) {
    translate.setDefaultLang('soccer');
    translate.setTranslation('soccer', soccer);
    translate.setTranslation('crimea', crimea);
    translate.use('soccer');
  }
}
