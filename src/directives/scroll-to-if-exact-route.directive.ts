
/**
 * Created by ozknemoy on 18.05.2018.
 */
import {Directive, ElementRef, Input, Inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Directive({
  selector : '[scrollToIfExactRoute]',
  host : {
    '(click)' : 'click($event)'
  },
})
export class ScrollToIfExactRouteDirective {
  @Input() private scrollToIfExactRoute: string | number;
  private forState = this.el.nativeElement.getAttribute('forState');
  private ref = this.el.nativeElement.getAttribute('ref');


  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    @Inject('scrollToFactory') private scrollToFactory: Function
  ) {}

  click(event: Event) {
    // прокрутка только если если заданый урл совпадает с текущим или не задан вообще
    if(this.forState === undefined || this.forState === this.route.snapshot.routeConfig.path) {
      event.preventDefault();
      this.scrollToFactory(this.scrollToIfExactRoute)
    } else if(this.ref) {
      // для чужого урла костыль тк как fragment до сих пор не работает
      window.open(this.ref, '_self')
    }
  }
}