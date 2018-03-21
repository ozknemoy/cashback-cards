/**
 * Created by ozknemoy on 17.01.2017.
 *
 */
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReCaptchaModule } from 'angular2-recaptcha';
import {NgxPaginationModule} from 'ngx-pagination/dist/ngx-pagination';
import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import {NgxQRCodeModule} from "ngx-qrcode2";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMaskModule} from 'ngx-mask'
import {TranslateModule} from '@ngx-translate/core';

// в импорты модулей приложения. не в модуль директив!!!
export const vendorModules = [
    NoopAnimationsModule,
    ToastModule.forRoot(),
    ReCaptchaModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot(),
    //bootstrap Modules
    ModalModule.forRoot(),
];

