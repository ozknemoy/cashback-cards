
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Directive, ElementRef, Input} from "@angular/core";
@Directive({
    selector : '[href]',
    host : {
        '(click)' : 'click($event)'
    },
})
export class HrefDirective {
    @Input() href;
  private target = this.el.nativeElement.getAttribute('target');

  constructor(private el: ElementRef) {}

  click(event) {
      console.log('***', this.href, this.target);
      window.open(this.href, this.target)
  }
}