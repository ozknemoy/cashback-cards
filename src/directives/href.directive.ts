
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Directive, ElementRef, Input} from "@angular/core";
@Directive({
    selector : '[hrefExt]'
})
export class HrefExtDirective{
  @Input() private hrefExt;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.setAttribute('href', this.hrefExt)
  }
}

@Directive({
  selector : '[href]',
  host : {
    '(click)' : 'click($event)'
  },
})
export class HrefDirective {
  @Input() private href;
  private target = this.el.nativeElement.getAttribute('target');

  constructor(private el: ElementRef) {}

  click(event) {
    window.open(this.href, this.target)
  }
}