/**
 * Created by ozknemoy on 15.05.2017.
 */
import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: 'for-partners-modal',
  templateUrl: './for-partners-button.modal.html'
})
export class ForPartnersButtonModal {

  constructor(public bsModalRef: BsModalRef,) {}

  close() {
    this.bsModalRef.hide()
  }
}
