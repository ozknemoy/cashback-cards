/**
 * Created by ozknemoy on 15.05.2017.
 */
import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";

declare const download: any;

enum Type {
  barcode = '.barcode',
  qrcode = '.qrcode',
}

@Component({
  selector: 'barcode-button-modal',
  templateUrl: 'qr-barcode-button.html'
})
export class QrBarcodeButtonModal {

  public code: string;
  public Type = Type;
  public type = Type.qrcode;

  constructor(public bsModalRef: BsModalRef,) {}

  saveImg() {
    // имя будет как code
    download(
      document.querySelector(this.type + ' > img').getAttribute('src'),
      this.code /*, по умолчанию png*/);
  }

  ngAfterViewInit() {
    //не нужно пока не строю изображение дублер
    //this.imgUrl = document.querySelector(' > img').getAttribute('src');
  }

  close() {
    this.bsModalRef.hide()
  }
}
