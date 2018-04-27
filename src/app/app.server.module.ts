import {NgModule, Inject} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {AuthLocalStorage} from "../services/auth-local-storage.service";
import { Request, Response } from 'express';
import {REQUEST} from "@nguniversal/express-engine/typings/esm5/tokens";


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
      @Inject(REQUEST) private req: Request
  ) {
    // пишу в localstorage поля из куки и урлы
    authLocalStorage.setCookiesToLS(req.headers.cookie);
    authLocalStorage.nodeData.host = req.headers.host;
    authLocalStorage.nodeData.localUrl = req.originalUrl;

  }
}
