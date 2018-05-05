/**
 * Created by ozknemoy on 05.05.2018.
 */
import {Directive} from "@angular/core";
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {ForPartnersButtonModal} from "./for-partners-button.modal";

@Directive({
  selector: 'for-partners-button',
  host: {
    '(click)': 'open()'
  }
})
export class ForPartnersButtonDirective {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {

  }

  open() {
    this.bsModalRef = this.modalService.show(ForPartnersButtonModal, {
      class: 'modal-prt',
      initialState: {}
    });
  }
}
