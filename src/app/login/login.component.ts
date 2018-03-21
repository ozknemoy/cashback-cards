
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {Component,ChangeDetectorRef} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {HttpService} from "../../services/http.service";
import {LocalStorage} from "../../services/localStorage.service";

@Component({
    selector: 'login-view',
    templateUrl: 'login.component.html'
})
@AutoUnsubscribe()
export class LoginView {
    public toggle = false;
    public phone: string;
    public password: string;
    public pend:boolean = false;

    constructor(
        public httpService: HttpService,
        public router: Router,
        public localStorage: LocalStorage,
        private sharedService: SharedService
    ) {}

    login(form) {
        if(form.invalid) return;
        this.pend = true;
        this.httpService.login({
            password: form.value.password,
            email: form.value.phone.toLowerCase()
        }).subscribe(
            d => {
                setTimeout(()=> {
                    this.sharedService.emit['isLogIn'](true);
                    this.router.navigate(['/profile']);
                },100)
            },
            e=> {},
            ()=> this.pend = false);
    }

    restore(obj) {
        this.pend = true;
        this.httpService.preRestorePassword(obj.email).subscribe(
            d=> {},
            e=> {},
            ()=> this.pend = false)
    }
}