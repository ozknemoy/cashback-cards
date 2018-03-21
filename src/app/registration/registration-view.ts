import {Component,ViewChild,Inject} from "@angular/core";
import {ReCaptchaComponent} from "angular2-recaptcha";
import {ActivatedRoute} from "@angular/router";
import {LocalStorage} from "../../services/localStorage.service";
import {Router} from "@angular/router";
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {UAService} from "../../services/user-agent.service";
import {Meta,Title} from "@angular/platform-browser";
import {TITLE} from '../../config/small.configs'
import {HttpService} from "../../services/http.service";
import {SharedService} from "../../services/shared.service";

@Component({
    selector: 'registration-view',
    templateUrl: './registration-view.html'
})
@AutoUnsubscribe()
export class RegistrationView{
    public stepOneModel = {
        phone: null,
        password: null,
        passwordTwo: null
    };

    public step: 'one' | 'two' | 'three' = 'one';

    constructor(
        public httpService:HttpService,
        private sharedService: SharedService,
        public router: Router,
        public route: ActivatedRoute,
        public localStorage: LocalStorage,
        public uAService: UAService,
        private metaService: Meta,
        private titleService: Title
    ) {}

    ngOnInit() {
        //https://netbasal.com/exploring-the-new-meta-service-in-angular-version-4-b5ba2403d3e6
        this.metaService.addTags([
            { name: 'twitter:title', content: 'Регистрация на приорити' },
            { property: 'og:title', content: 'Регистрация на приорити' }
        ]);
        this.titleService.setTitle('Регистрация');

    }

    isEqualValidPassword(stepOneForm):boolean {
        const stepOneModel = stepOneForm.controls;
        return  stepOneModel.password && stepOneModel.password.valid
            &&  stepOneModel.passwordTwo.value === stepOneModel.password.value
    }

    toStepTwo(stepOneFormValue) {
        console.log("8888",stepOneFormValue);
        this.step = 'two';
    }

    signup() {
        /*this.pending = true;
        this.form.email = <any>this.form.email.toLowerCase();
        this.httpService.postWithToast(
            'users/registration',
            {User: this.form},
            'Вы успешно зарегистрировались.',
            11e3
        ).subscribe(d => {
            this.regSuccess = true;
            this.localStorage.removeItem('ref');
            // сразу же логин. не обрабатываю провал тк данные верные
            this.login$$ = this.httpService.login({
                email: this.form.email,
                password: this.form.password
            }).subscribe(d => {})
        }, err => {
            this.pending = false;

        })*/
    }

    ngOnDestroy() {
        this.metaService.removeTag("name='og:title'");
        this.metaService.removeTag("name='twitter:title'");
        this.titleService.setTitle(TITLE);
    }
}