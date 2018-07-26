/**
 * Created by ozknemoy on 05.05.2018.
 */
import {Directive} from "@angular/core";
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {FeedbackButtonModal} from "./feedback-button.modal";

@Directive({
  selector: '[feedbackButton]',
  host: {
    '(click)': 'open()'
  }
})
export class FeedbackButtonDirective {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {

  }

  open() {
    this.bsModalRef = this.modalService.show(FeedbackButtonModal, {
      class: 'modal-prt',
      initialState: {}
    });
  }
}
