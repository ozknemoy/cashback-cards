/**
 * Created by ozknemoy on 15.03.2018.
 * при focus на элемент применяется класс focus
 */
import {Component,ElementRef,Renderer} from "@angular/core";

@Component({
    selector: 'lk-sidebar',
    templateUrl: './lk-sidebar.component.html'
})
export class LkSidebarComponent {
    constructor(private elementRef: ElementRef, private renderer: Renderer) {}


}