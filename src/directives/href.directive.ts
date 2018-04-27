
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Directive, ElementRef, Input} from "@angular/core";
@Directive({
    selector : '[hrefExt]'
})
export class HrefDirective{
  @Input() hrefExt;

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute('href', this.hrefExt)
  }
}