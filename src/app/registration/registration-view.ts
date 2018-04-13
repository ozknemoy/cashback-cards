import {Component,Inject} from "@angular/core";
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {Meta,Title} from "@angular/platform-browser";
import {TITLE} from '../../config/small.configs'
import {HttpService} from "../../services/http.service";
import {Toast, ToastsManager} from "ng2-toastr";
import {UAService} from "../../services/user-agent.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";

export function isEqualValidPassword(stepOneModel):boolean {
  return stepOneModel.password && stepOneModel.password.valid
    && stepOneModel.passwordTwo.value === stepOneModel.password.value
}


@Component({
  selector: 'registration-view',
  templateUrl: './registration-view.html'
})
@AutoUnsubscribe()
export class RegistrationView {
  public stepOneModel = {
    phone: null,
    password: null,
    passwordTwo: null,
    code: null,
    card_number: null,
  };
  private login$$;
  public step:'one' | 'two' | 'three' = 'one';
  public showPass = false;
  public isAndroid = false;
  public isBrowser = this.authLocalStorage.isBrowser;

  constructor(
    public httpService:HttpService,
    private metaService: Meta,
    private toast: ToastsManager,
    private titleService: Title,
    public uAService: UAService,
    public authLocalStorage: AuthLocalStorage,
    @Inject('phoneMask') public phoneMask: string,
    @Inject('cardMask') public cardMask: string,
    @Inject('phonePlaceholder') public phonePlaceholder: string
  ) {}

  ngOnInit() {
    if(this.isBrowser) {
      this.isAndroid = this.uAService.is().android;
    }
    //https://netbasal.com/exploring-the-new-meta-service-in-angular-version-4-b5ba2403d3e6
    this.metaService.addTags([
      {name: 'twitter:title', content: 'Регистрация'},
      {property: 'og:title', content: 'Регистрация'}
    ]);
    this.titleService.setTitle('Регистрация');

  }

  isEqualValidPassword(stepOneForm):boolean {
    return isEqualValidPassword(stepOneForm.controls)
  }

  toStepTwo() {
    this.httpService.get('users/check-phone?phone=' + this.stepOneModel.phone).subscribe(
      d => {
        this.httpService.getSms(this.stepOneModel.phone).subscribe(
          d => this.step = 'two'
        )
      }
    )

  }

  toStepThree(sms:string) {
    this.httpService.get(
      `users/check-confirm-code?code=${sms}&phone=${this.stepOneModel.phone}`
    ).subscribe(
      d => this.step = 'three',
      err => {}
    )
  }

  signup(withExistedCard:boolean) {
    //если card_number нет, то создастся новая карта
    if (!withExistedCard) this.stepOneModel.card_number = null;
    this.httpService.post(
      'users/registration',
      {RegistrationForm: this.stepOneModel},
      'Вы успешно зарегистрировались.',
      10e3,
      true
    ).subscribe(
      d => {
        // сразу же логин. не обрабатываю провал тк данные верные
        this.login$$ = this.httpService.login({
          phone: this.stepOneModel.phone,
          password: this.stepOneModel.password
        }).subscribe(d => {})
    }, err => {}
    )
  }

  getSms() {
    this.httpService.getSms(this.stepOneModel.phone)
  }

  ngOnDestroy() {
    this.metaService.removeTag("name='og:title'");
    this.metaService.removeTag("name='twitter:title'");
    this.titleService.setTitle(TITLE);
  }
}