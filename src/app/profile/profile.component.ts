import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {HttpService} from "../../services/http.service";



@Component({
    selector: 'profile-view',
    templateUrl: 'profile.component.html'
})
@AutoUnsubscribe()
export class ProfileView {

    constructor(
        public httpService: HttpService
    ) {



    }




}