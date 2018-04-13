import {Component,ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {HttpService} from "../../services/http.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {BsModalService} from "../../../node_modules/ngx-bootstrap/modal/bs-modal.service";
import {BsModalRef} from "../../../node_modules/ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
    selector: 'login-modal',
    templateUrl: 'login-modal.html'
})
export class LoginModalComponent {
    public toggle = false;
    public email: string;
    public password: string;
    public pend:boolean = false;

    constructor(public httpService: HttpService,
                public router: Router,
                public bsModalRef: BsModalRef,
                public authLocalStorage: AuthLocalStorage,
                private sharedService: SharedService
    ) {

    }

    login(form) {
        if(form.invalid) return;
        this.pend = true;
        this.httpService.login({
            password: form.value.password,
            email: form.value.email.toLowerCase()
        }).subscribe(d => {

            this.hide();
            setTimeout(()=> {
                this.sharedService.emit['isLogIn'](true);
                //this.router.navigate(['/profile/main/common']);
            },100)
        },
            e=> {},
            ()=> this.pend = false);
    }

    restore(obj) {
        this.pend = true;
        this.httpService.preRestorePassword(obj.email).subscribe(d=> {
                this.hide();
        },
            e=> {},
            ()=> this.pend = false)
    }

    hide() {
        this.bsModalRef.hide()
    }
}
