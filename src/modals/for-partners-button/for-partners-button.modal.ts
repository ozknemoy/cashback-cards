/**
 * Created by ozknemoy on 15.05.2017.
 */
import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {HttpService} from "../../services/http.service";
import {NgForm} from "@angular/forms";

class NewPartner {
  phone: string = null;
  ur_name: string = null;
  email: string = null;
  contact_name: string = null;
}

@Component({
  selector: 'for-partners-modal',
  templateUrl: './for-partners-button.modal.html'
})
export class ForPartnersButtonModal {
  public newPartner = new NewPartner();
  constructor(public bsModalRef: BsModalRef, private httpService: HttpService) {}

  close() {
    this.bsModalRef.hide()
  }

  send(form: NgForm) {
    this.httpService.post('partner-requests/create', {PartnerRequest: form.value}, 'Заявка отправлена')
      .subscribe(()=>this.close())
  }

}
