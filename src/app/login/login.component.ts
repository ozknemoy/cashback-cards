import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {Component,ChangeDetectorRef,Inject} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../services/shared.service";
import {HttpService} from "../../services/http.service";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {NgForm} from "@angular/forms";
import {isEqualValidPassword} from "../registration/registration-view";
import {UAService} from "../../services/user-agent.service";

enum Step {
  login = 'login',
  reset = 'reset'
}

enum ResetStep {
  one,
  two
}

interface IReset {
  password: string,
  passwordTwo: string,
  code: string,
}

@Component({
  selector: 'login-view',
  templateUrl: 'login.component.html'
})
@AutoUnsubscribe()
export class LoginView {
  public toggle = false;
  public phone:string;
  public password:string;
  public pend = false;
  public reset = {
    password: null,
    passwordTwo: null,
    code: null,
  };
  public Step = Step;
  public step:Step = Step.login;
  public ResetStep = ResetStep;
  public resetStep = ResetStep.one;
  public showPass = false;
  public isAndroid = false;
  public isBrowser = this.authLocalStorage.isBrowser;

  constructor(
    public httpService:HttpService,
    public authLocalStorage: AuthLocalStorage,
    public uAService: UAService,
    @Inject('phoneMask') public phoneMask: string,
    @Inject('phonePlaceholder') public phonePlaceholder: string
  ) {

  }

  ngOnInit() {
    if(this.isBrowser) {
      this.isAndroid = this.uAService.is().android;
    }
  }

  login(form: NgForm) {
    if (form.invalid) return;
    this.pend = true;
    this.httpService.login({
      password: form.value.password,
      phone: form.value.phone
    }).subscribe(
      d => {},
      e=> {},
      ()=> this.pend = false
    );
  }

  restore(reset: IReset) {
    this.pend = true;
    this.httpService.preRestorePassword({...reset, ...{phone: this.phone}}).subscribe(
      d=> {
        this.step = Step.login;
        this.resetStep = ResetStep.one;
      },
      e=> {},
      ()=> this.pend = false
    )
  }

  isEqualValidPassword(stepOneForm: NgForm):boolean {
    return isEqualValidPassword(stepOneForm.controls)
  }

  toResetStepTwo(resetForm: NgForm) {
    if(resetForm.invalid) return;
    this.pend = true;
    this.httpService.getSms(this.phone).subscribe(
      d => {this.resetStep = ResetStep.two},
      err => {},
      ()=> {this.pend = false}
    )
  }
}