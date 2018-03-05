import {NgModule, Inject} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {LocalStorage} from "../services/localStorage.service";

import { REQUEST } from '@nguniversal/express-engine';


@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  providers: [
    LocalStorage,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(
      public localStorage:LocalStorage,
      @Inject(REQUEST) private req: any
  ) {
    //console.log("AppServerModule", req);

    // пишу в localstorage поля из куки
    localStorage.setCookiesToLS(req.headers.cookie)

  }
}
