/**
 * изначально это была модалка отправки письма юзеру
 * Created by ozknemoy on 15.05.2017.
 */
import {Input, Component} from "@angular/core";
import {UAService} from "../../services/user-agent.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {QrBarcodeButtonModal} from "./qr-barcode-button.modal";

@Component({
  selector: 'qr-barcode-button',
  template: '<button class="btn btn-info btn-sm"  >Штрих/QR-код</button>',
  host: {
    '(click)': 'open()'
  }
})
export class QrBarcodeButtonomponent {
  @Input() code: string;
  public isMobile: boolean;
  bsModalRef: BsModalRef;
  public isBrowser = this.authLocalStorage.isBrowser;

  constructor(private modalService: BsModalService,
              public UAService: UAService,
              public authLocalStorage: AuthLocalStorage,) {
  }

  ngOnInit() {
    this.isMobile = this.isBrowser && this.UAService.isMobile.any()
  }

  open() {
    this.bsModalRef = this.modalService.show(QrBarcodeButtonModal, {
      initialState: {
        //Make sure that you have a code in ModalComponent
        code: this.code
      }
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
