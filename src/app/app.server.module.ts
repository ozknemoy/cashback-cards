import {NgModule, Inject} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {AuthLocalStorage} from "../services/auth-local-storage.service";

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
    AuthLocalStorage,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(
      public authLocalStorage:AuthLocalStorage,
      @Inject(REQUEST) private req: any
  ) {
    //console.log("AppServerModule", req);

    // пишу в localstorage поля из куки
    authLocalStorage.setCookiesToLS(req.headers.cookie)

  }
}
