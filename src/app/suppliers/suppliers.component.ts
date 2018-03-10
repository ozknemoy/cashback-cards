/**
 * Created by ozknemoy on 13.04.2017.
 */
import {Component} from '@angular/core';
import {AutoUnsubscribe} from "../../services/@AutoUnsubscribe.decorator";
import {HttpService} from "../../services/http.service";

interface ISupplier {


}

@Component({
    selector: 'suppliers-view',
    templateUrl: 'suppliers.component.html'
})
@AutoUnsubscribe()
export class SuppliersView {
    suppliers: ISupplier[];

    constructor(
        public httpService: HttpService
    ) {



    }




}