import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Inject,Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_URL} from "../config/base_url";
import {LocalStorage} from "./localStorage.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import {ToastsManager} from "ng2-toastr";
import {SharedService} from "./shared.service";

import {isBefore, /*isWithinRange,*/ addMinutes, differenceInMinutes} from 'date-fns'

@Injectable()
export class HttpService {

  public BASE_URL = BASE_URL;
  public isBrowser = this.localStorage.isBrowser;

  constructor(
    public localStorage:LocalStorage,
    public http:HttpClient,
    public sharedService:SharedService,
    public router:Router,
    public toast:ToastsManager
  ) {

  }

  getGlobal(url) {
    return this.http.get(url)
  }

  get(url) {
    var headers = this.doWitAuth();
    return this.http.get(this.BASE_URL + url, {headers})
      .catch(e=> this.handleError(e, '_getWithToast'))
  }

  getWithToast(url:string, text:string, toastLife?:number) {
    return this.get(url).map((d)=> {
      this.toast.info('', text, {
        showCloseButton: true,
        toastLife
      });
      return d
    }).catch(e=> this.handleError(e, '_getWithToast'))
  }

  globalGet(url) {
    return this.http.get(url)
  }

  /*post(url, body) {
   return this.http.post(this.BASE_URL + url, body,{responseType: 'json', 'Content-Type': 'json'})
   }*/


  post(url:string, _d, textToast:string = '', toastLife = 7e3) {//WithAuth
    var d = JSON.stringify(_d);
    var headers = this.doWitAuth(d);
    return this.http.post(this.BASE_URL + url, d, {headers})
      .map((d)=> {
        if (textToast) this.toast.info('', textToast, {
          showCloseButton: true,
          toastLife: toastLife
        });
        return d
      })
      .catch(e=> this.handleError(e, '_post'))
  }

  doWitAuth(str = ''):HttpHeaders {
    const t = this.getToken();
    let _headers:HttpHeaders = new HttpHeaders();
    let hash = this.getHash(str);

    if (t) _headers = _headers.append('X-AUTH-TOKEN', 'PiU ' + t);
    _headers = _headers.append('X-DUDE', 'ANG ' + hash)
      .append('Content-Type', 'application/json');
    return _headers
  }

  MD5(s) {
    function L(k, d) {
      return (k << d) | (k >>> (32 - d))
    }

    function K(G, k) {
      var I, d, F, H, x;
      F = (G & 2147483648);
      H = (k & 2147483648);
      I = (G & 1073741824);
      d = (k & 1073741824);
      x = (G & 1073741823) + (k & 1073741823);
      if (I & d) {
        return (x ^ 2147483648 ^ F ^ H)
      }
      if (I | d) {
        if (x & 1073741824) {
          return (x ^ 3221225472 ^ F ^ H)
        } else {
          return (x ^ 1073741824 ^ F ^ H)
        }
      } else {
        return (x ^ F ^ H)
      }
    }

    function r(d, F, k) {
      return (d & F) | ((~d) & k)
    }

    function q(d, F, k) {
      return (d & k) | (F & (~k))
    }

    function p(d, F, k) {
      return (d ^ F ^ k)
    }

    function n(d, F, k) {
      return (F ^ (d | (~k)))
    }

    function u(G, F, aa, Z, k, H, I) {
      G = K(G, K(K(r(F, aa, Z), k), I));
      return K(L(G, H), F)
    }

    function f(G, F, aa, Z, k, H, I) {
      G = K(G, K(K(q(F, aa, Z), k), I));
      return K(L(G, H), F)
    }

    function D(G, F, aa, Z, k, H, I) {
      G = K(G, K(K(p(F, aa, Z), k), I));
      return K(L(G, H), F)
    }

    function t(G, F, aa, Z, k, H, I) {
      G = K(G, K(K(n(F, aa, Z), k), I));
      return K(L(G, H), F)
    }

    function e(G) {
      var Z;
      var F = G.length;
      var x = F + 8;
      var k = (x - (x % 64)) / 64;
      var I = (k + 1) * 16;
      var aa = Array(I - 1);
      var d = 0;
      var H = 0;
      while (H < F) {
        Z = (H - (H % 4)) / 4;
        d = (H % 4) * 8;
        aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
        H++
      }
      Z = (H - (H % 4)) / 4;
      d = (H % 4) * 8;
      aa[Z] = aa[Z] | (128 << d);
      aa[I - 2] = F << 3;
      aa[I - 1] = F >>> 29;
      return aa
    }

    function B(x) {
      var k = "", F = "", G, d;
      for (d = 0; d <= 3; d++) {
        G = (x >>> (d * 8)) & 255;
        F = "0" + G.toString(16);
        k = k + F.substr(F.length - 2, 2)
      }
      return k
    }

    function J(k) {
      k = k.replace(/rn/g, "n");
      var d = "";
      for (var F = 0; F < k.length; F++) {
        var x = k.charCodeAt(F);
        if (x < 128) {
          d += String.fromCharCode(x)
        } else {
          if ((x > 127) && (x < 2048)) {
            d += String.fromCharCode((x >> 6) | 192);
            d += String.fromCharCode((x & 63) | 128)
          } else {
            d += String.fromCharCode((x >> 12) | 224);
            d += String.fromCharCode(((x >> 6) & 63) | 128);
            d += String.fromCharCode((x & 63) | 128)
          }
        }
      }
      return d
    }

    var C = Array();
    var P, h, E, v, g, Y, X, W, V;
    var S = 7, Q = 12, N = 17, M = 22;
    var A = 5, z = 9, y = 14, w = 20;
    var o = 4, m = 11, l = 16, j = 23;
    var U = 6, T = 10, R = 15, O = 21;
    s = J(s);
    C = e(s);
    Y = 1732584193;
    X = 4023233417;
    W = 2562383102;
    V = 271733878;
    for (P = 0; P < C.length; P += 16) {
      h = Y;
      E = X;
      v = W;
      g = V;
      Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
      V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
      W = u(W, V, Y, X, C[P + 2], N, 606105819);
      X = u(X, W, V, Y, C[P + 3], M, 3250441966);
      Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
      V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
      W = u(W, V, Y, X, C[P + 6], N, 2821735955);
      X = u(X, W, V, Y, C[P + 7], M, 4249261313);
      Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
      V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
      W = u(W, V, Y, X, C[P + 10], N, 4294925233);
      X = u(X, W, V, Y, C[P + 11], M, 2304563134);
      Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
      V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
      W = u(W, V, Y, X, C[P + 14], N, 2792965006);
      X = u(X, W, V, Y, C[P + 15], M, 1236535329);
      Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
      V = f(V, Y, X, W, C[P + 6], z, 3225465664);
      W = f(W, V, Y, X, C[P + 11], y, 643717713);
      X = f(X, W, V, Y, C[P + 0], w, 3921069994);
      Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
      V = f(V, Y, X, W, C[P + 10], z, 38016083);
      W = f(W, V, Y, X, C[P + 15], y, 3634488961);
      X = f(X, W, V, Y, C[P + 4], w, 3889429448);
      Y = f(Y, X, W, V, C[P + 9], A, 568446438);
      V = f(V, Y, X, W, C[P + 14], z, 3275163606);
      W = f(W, V, Y, X, C[P + 3], y, 4107603335);
      X = f(X, W, V, Y, C[P + 8], w, 1163531501);
      Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
      V = f(V, Y, X, W, C[P + 2], z, 4243563512);
      W = f(W, V, Y, X, C[P + 7], y, 1735328473);
      X = f(X, W, V, Y, C[P + 12], w, 2368359562);
      Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
      V = D(V, Y, X, W, C[P + 8], m, 2272392833);
      W = D(W, V, Y, X, C[P + 11], l, 1839030562);
      X = D(X, W, V, Y, C[P + 14], j, 4259657740);
      Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
      V = D(V, Y, X, W, C[P + 4], m, 1272893353);
      W = D(W, V, Y, X, C[P + 7], l, 4139469664);
      X = D(X, W, V, Y, C[P + 10], j, 3200236656);
      Y = D(Y, X, W, V, C[P + 13], o, 681279174);
      V = D(V, Y, X, W, C[P + 0], m, 3936430074);
      W = D(W, V, Y, X, C[P + 3], l, 3572445317);
      X = D(X, W, V, Y, C[P + 6], j, 76029189);
      Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
      V = D(V, Y, X, W, C[P + 12], m, 3873151461);
      W = D(W, V, Y, X, C[P + 15], l, 530742520);
      X = D(X, W, V, Y, C[P + 2], j, 3299628645);
      Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
      V = t(V, Y, X, W, C[P + 7], T, 1126891415);
      W = t(W, V, Y, X, C[P + 14], R, 2878612391);
      X = t(X, W, V, Y, C[P + 5], O, 4237533241);
      Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
      V = t(V, Y, X, W, C[P + 3], T, 2399980690);
      W = t(W, V, Y, X, C[P + 10], R, 4293915773);
      X = t(X, W, V, Y, C[P + 1], O, 2240044497);
      Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
      V = t(V, Y, X, W, C[P + 15], T, 4264355552);
      W = t(W, V, Y, X, C[P + 6], R, 2734768916);
      X = t(X, W, V, Y, C[P + 13], O, 1309151649);
      Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
      V = t(V, Y, X, W, C[P + 11], T, 3174756917);
      W = t(W, V, Y, X, C[P + 2], R, 718787259);
      X = t(X, W, V, Y, C[P + 9], O, 3951481745);
      Y = K(Y, h);
      X = K(X, E);
      W = K(W, v);
      V = K(V, g)
    }
    var i = B(Y) + B(X) + B(W) + B(V);
    return i.toLowerCase()
  };

  getHash(str:string, withSalt = true) {
    return this.MD5(str + (withSalt ? '605ac13117bae148' + 'bd010f610833baad' : ''))
  }

  // обрабатываю ошибки тостами для браузера и консолью для ноды
  handleError(e, str:string) {
    if (!this.isBrowser) {
      console.log((new Date() + '').slice(4, 25) + "__handleError in httpService by " + str, e.error, e.url, e.message);
    } else {
      const err = e.error;
      console.log('----',err.error,err.errors );
      if ((err.errors && typeof err.errors === 'string')
        || (err.error && typeof err.error === 'string')) {
        this.toast.error(err.errors || err.error, 'Ошибка!', {
          showCloseButton: true,
          toastLife: 22e3
        });
      } else if (err.errors && typeof err.errors === 'object') {
        this.handleErrObject(err.errors).forEach(message=> {
          this.toast.error(message, 'Ошибка!', {
            showCloseButton: true,
            toastLife: 22e3
          });
        })
      }

    }

    return Observable.throw(e)
  }

  // обрабатываю в удобоваримый вид ошибки с сервера
  handleErrObject(obj) {
    var arrOfErrors = [];
    for (var key in obj) {
      arrOfErrors.push(obj[key][0])
    }
    return arrOfErrors
  }

  isAuth():boolean {
    return !!this.getToken()
  }

  getToken() {
    if (this.isBrowser) {
      return this.localStorage.get('hash');
    } else {
      return this.localStorage.auth['hash']
    }

  }

  restorePassword(password:string) {
    return this.postWithToast(
      'users/requestPasswordReset',
      {"email": password},
      'Вы успешно сменили пароль.')
  };

  preRestorePassword(resetForm:Object) {
    return this.postWithToast(
      'users/requestPasswordReset',
      {PasswordResetRequestForm: resetForm},
      'Пароль успешно изменен.', 20e3)
  };

  login(obj) {
    return this.postWithToast('users/auth', obj, 'Вы успешно вошли.', 7e3)
      .map(d=> {
        this.localStorage.setAuth(d);
        // задержка вроде для мозиллы
        setTimeout(()=> {
          this.sharedService.emit['isLogIn'](true);
          this.router.navigate(['/profile']);
        }, 100);
        return d
      })
  }

  postWithToast(url:string, _d, text = 'Успешно сохранено', toastLife?) {
    return this.post(url, _d, text, toastLife)
  }

  getSms(phone) {
    if(this.isSmsObsolete(phone)) {
      return this.getWithToast(
        `users/get-confirm-code?phone=${phone}`,
        'Вам отправлена смс на указанный номер',
        5e3
      )
    } else {
      // тогда просто вернуть успех
      console.warn('is fresh');
      return Observable.of(1)
    }

  }

  private smsPrefix = 'sms-';

  private isSmsObsolete(phone: string, timeout = 15) {
    const prevSmsDate = this.localStorage.get(this.smsPrefix + phone);
    if(prevSmsDate) {
      // проверяю если дата в хранилище + N минут раньше чем сейчас
      if(isBefore(addMinutes(new Date(prevSmsDate), timeout),new Date())) {
        this.localStorage.set(this.smsPrefix + phone, new Date());
        return true
      } else {
        this.toast.info('', `Вы можете запросить смс раз в ${timeout} мин. Осталось ${1 + differenceInMinutes(addMinutes(new Date(prevSmsDate), timeout), new Date())} мин`, {
          showCloseButton: true,
          toastLife: 10e3
        });
        return false
      }
    } else {
      this.localStorage.set(this.smsPrefix + phone, new Date());
      return true
    }
  }
}