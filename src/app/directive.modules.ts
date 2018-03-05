/**
 * Created by ozknemoy on 15.01.2017.
 * директивы и компоненты. ангулара, сторонние и мои
 * этот модуль должен наследовать каждый модуль приложения
 *
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {vendorModules} from './vendor.modules';
import {LoginModalComponent} from "../modals/login-modal/login-modal";
import {HrefDirective} from "../directives/href.directive";
import {BlurFocusDirective} from "../directives/blur-focus.directive";
import {OuterHref} from "../directives/outer-href.directive";
import {loginModalButtonDirective} from "../modals/login-modal/login-modal.directive";




export const vendorDirectiveModules = [
    //FileUploadModule,
];

const __modals__ = [
    //BarcodeButtonModal,
    LoginModalComponent,
    //OuterHrefModalComponent
];
export const routelessComponents = [
    //OuterHrefModalComponent,
    //OuterHrefDirective,
    OuterHref,
    BlurFocusDirective,
    loginModalButtonDirective,
    HrefDirective,

    //FileUploaderComponent,
    //OzkNumberDirective,
    //ScrollDirective

];

@NgModule({
    imports: [RouterModule,CommonModule,FormsModule, vendorDirectiveModules,vendorModules],
    declarations:[routelessComponents,__modals__,/*__entryComponents__*/],
    exports:[routelessComponents,vendorDirectiveModules,CommonModule,FormsModule],
    // IMPORTANT:
    // динамические компоненты
    // Since modals is never explicitly used (in a template)
    // we must tell angular about it.
    entryComponents: [ __modals__/*,__entryComponents__*/ ]
})
export class DirectiveModule{}