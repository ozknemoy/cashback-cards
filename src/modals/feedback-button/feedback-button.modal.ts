/**
 * Created by ozknemoy on 15.05.2017.
 */
import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal/bs-modal-ref.service";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'for-partners-modal',
  templateUrl: './feedback-button.modal.html'
})
export class FeedbackButtonModal {

  public categories;
  public catKeys;
  public model = {
    text: '',
    category_id: null
  };
  constructor(public bsModalRef: BsModalRef, private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get('handbooks/feedback-category')
      .subscribe((categories)=> {
        this.categories = categories;
        this.catKeys = Object.keys(categories);
      })
  }

  close() {
    this.bsModalRef.hide()
  }

  send({category_id, text}) {
    this.httpService.post('profiles/send-feedback', {FeedbackForm:{category_id, text}}, 'Письмо отправлено')
      .subscribe(()=>this.close())
  }

}
