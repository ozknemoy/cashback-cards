
/**
 * Created by ozknemoy on 19.05.2017.
 */
import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {AuthLocalStorage} from "../services/auth-local-storage.service";
@Directive({
    selector : '[addClassAfterScroll]',
    /*host : {
        '(scroll)' : 'scroll($event)'
    },*/
})
export class AddClassAfterScrollDirective{
  @Input()
  private addClassAfterScroll: number;
  private elClass = 'header-fixed';


  constructor(private el: ElementRef, private authLocalStorage: AuthLocalStorage) {

  }


  @HostListener('window:scroll', ['$event'])
  private onScroll($event):void {
    if(!this.authLocalStorage.isBrowser) return;
    if($event.target.documentElement.scrollTop >= this.addClassAfterScroll) {
      this.el.nativeElement.setAttribute('class', this.elClass)
    } else {
      this.el.nativeElement.removeAttribute('class', this.elClass)
    }
  };

}