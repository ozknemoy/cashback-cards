/**
 * Created by ozknemoy on 17.01.2017.
 *
 */
import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
//import {CollapseModule} from 'ngx-bootstrap/collapse';
import {ReCaptchaModule} from 'angular2-recaptcha';
import {NgxPaginationModule} from 'ngx-pagination/dist/ngx-pagination';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaskModule} from 'ngx-mask'
import {TranslateModule} from '@ngx-translate/core';
//import {GeoComponent} from "./geo/geo.module";
import {AgmCoreModule} from "@agm/core";
import {NgxBarcodeModule} from "ngx-barcode";
import * as ret from '../../config-ext/index.js';


export const vendorModules = [
  NoopAnimationsModule,
  ToastModule.forRoot(),
  ReCaptchaModule,
  NgxPaginationModule,
  NgxQRCodeModule,
  NgxMaskModule.forRoot(),
  TranslateModule.forRoot(),
  AgmCoreModule.forRoot({apiKey: ret.gMapsArenasport}),
  NgxBarcodeModule,

  //bootstrap Modules
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  //CollapseModule.forRoot(),
];

