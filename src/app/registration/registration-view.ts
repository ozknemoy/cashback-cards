import {Component,Inject} from "@angular/core";
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {Meta,Title} from "@angular/platform-browser";
import {TITLE} from '../../config/small.configs'
import {HttpService} from "../../services/http.service";
import {UAService} from "../../services/user-agent.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {SeoService} from "../../services/seo.service";

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
    phone_code: 7
  };
  private phoneChunk = null;
  private login$$;
  public step:'one' | 'two' | 'three' = 'one';
  public showPass = false;
  public isAndroid = false;
  public isBrowser = this.authLocalStorage.isBrowser;
  public phoneCodes;

  constructor(
    public httpService:HttpService,
    public uAService: UAService,
    public authLocalStorage: AuthLocalStorage,
    @Inject('phoneMask') public phoneMask: string,
    @Inject('cardMask') public cardMask: string,
    @Inject('phonePlaceholder') public phonePlaceholder: string,
    public seoService: SeoService
  ) {}

  ngOnInit() {
    if(this.isBrowser) {
      this.seoService.handleOne('main');
      this.isAndroid = this.uAService.is().android;
      this.httpService.phoneCodes.subscribe(codes=>this.phoneCodes = codes)
    }

  }

  isEqualValidPassword(stepOneForm):boolean {
    return isEqualValidPassword(stepOneForm.controls)
  }

  toStepTwo() {
    this.stepOneModel.phone = this.stepOneModel.phone_code + this.phoneChunk;
    this.httpService.get('users/check-phone?phone=' + this.stepOneModel.phone).subscribe(
      d => this.getSms().subscribe(d => this.step = 'two')
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
    return this.httpService.getSms(this.stepOneModel.phone, this.stepOneModel.phone_code)
  }

  ngOnDestroy() {}
}