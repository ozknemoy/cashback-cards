import {Directive,ElementRef,Renderer} from "@angular/core";
/**
 * Created by ozknemoy on 15.01.2017.
 * при focus на элемент применяется класс focus
 */


@Directive({
    selector: 'blurFocus',
    //при focus на элемент применяется класс focus
    host: {
        '(focus)': 'setInputFocus(true)',
        '(blur)': 'setInputFocus(false)'
    }
})
export class BlurFocusDirective {
    constructor(private elementRef: ElementRef, private renderer: Renderer) {}

    setInputFocus(isSet: boolean): void {
        this.renderer.setElementClass(this.elementRef.nativeElement.parentElement, 'focus', isSet);
    }
}