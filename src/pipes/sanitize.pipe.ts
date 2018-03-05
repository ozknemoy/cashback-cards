/**
 * Created by ozknemoy on 17.03.2017.
 */
import {Pipe} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";



@Pipe({name: 'sanitize'})
export class SanitizePipe {
    constructor(private sanitizer:DomSanitizer){}

    transform(str:string) {
        return this.sanitizer.bypassSecurityTrustHtml(str);
        // return this.sanitizer.bypassSecurityTrustHtml(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}