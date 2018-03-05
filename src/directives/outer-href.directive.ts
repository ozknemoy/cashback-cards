/**
 * Created by ozknemoy on 02.05.2017.
 * если под логином то переход по внешней ссылке, иначе модалка
 */

import {Directive,Input} from "@angular/core";
import {HttpService} from "../services/http.service";

@Directive({
    selector: '[outerHrefFirst]',
    host: {
        '(click)': 'click()'
    }
})
export class OuterHref {
    @Input() outerHref: string;
    @Input() modal;

    constructor(public httpService: HttpService) {}


    click() {
        if(this.httpService.isAuth()) {
            console.log("outerHref",this.outerHref);
            window.open('http://' + this.outerHref, "_blank")
        } else {
            this.modal.show(this.outerHref);
        }

    }

}