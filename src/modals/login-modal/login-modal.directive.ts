/**
 * Created by ozknemoy on 15.05.2017.
 */
import {Directive,Input} from "@angular/core";
import {LoginModalComponent} from "./login-modal";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Directive({
    selector: '[loginModalButton]',
    host: {
        '(click)': 'click()'
    }
})

export class loginModalButtonDirective {
    bsModalRef: BsModalRef;
    constructor(
        private modalService: BsModalService
    ) {}

    click() {
        this.bsModalRef = this.modalService.show(LoginModalComponent/*, {initialState: [123123]}*/);
        this.bsModalRef.content.closeBtnName = 'Close';
    }
}
