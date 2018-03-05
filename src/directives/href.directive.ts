
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Directive,Input} from "@angular/core";
@Directive({
    selector : '[href]',
    host : {
        '(click)' : 'preventDefault($event)'
    }
})
export class HrefDirective {
    @Input() href;
    preventDefault(event) {
        if(this.href.length == 0) event.preventDefault();
    }
}