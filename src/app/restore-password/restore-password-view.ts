/**
 * Created by ozknemoy on 05.05.2017.
 */
import {Component,Inject} from '@angular/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr";
import {HttpService} from "../../services/http.service";

@Component({
    selector: 'restore-password-view',
    templateUrl: './restore-password-view.html',
})
@AutoUnsubscribe()
export class RestorePasswordView {
    public routeParams$;
    public token: string;
    public wrongToken = true;
    public password: string;
    public passwordTwo: string;
    public pend: boolean;
    public restorePassword$;

    constructor(
        public httpService: HttpService,
        public routeParams: ActivatedRoute,
        public router: Router,
        public toast:ToastsManager
    ) {}

    ngOnInit() {
        this.routeParams$ = this.routeParams.queryParams.map(params=> params['token'])
            .subscribe(token => {
                this.token=token;
                this.httpService.post('users/checkToken',{token})
                    .subscribe(
                        d=> this.wrongToken = false,
                        e=> this.wrongToken = true
                    )
            });
    }

    check() {
        if (this.password === this.passwordTwo) {
            this.pend = true;
            this.restorePassword$ = this.httpService.postWithToast(
                'users/resetPassword',
                {
                    token: this.token,
                    password: this.password
                },
                'Пароль успешно обновлен'
            ).subscribe(
                d => {this.router.navigate([''])},
                err => {},
                () => {this.pend = false}
            )
        } else {
            this.toast.error('Пароли не совпадают!', 'Ошибка', {
                showCloseButton: true,
                toastLife: 10e3
            });
        }
    }
}