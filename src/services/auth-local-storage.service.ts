/**
 * Created by ozknemoy on 02.03.2018.
 */
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Inject,Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {stringifyElement} from "@angular/platform-browser/testing/src/browser_util";
import {ToastsManager} from "ng2-toastr";
import {SharedService} from "./shared.service";


class AuthKeys {
  hash: string;
  name: string;
  surname: string;
  patronymic: string;
}

class AuthData extends AuthKeys {
  public data = {
    name: null
  }
}

@Injectable()
export class AuthLocalStorage {
  public hash:string;// для ноды
  public auth = new AuthData();
  storageKeyPrefix:string = 'prioriti-';
  public auth_keys = ['hash', 'name', 'surname', 'patronymic'];

  public isBrowser:boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId:Object,
    private router:Router,
    private toast: ToastsManager
  ) {
    this.initAuth();
  }

  setAuth(_obj, keys = this.auth_keys) {
    // сохраняю только нужные свойства
    let obj = {};
    keys.forEach((k: keyof AuthKeys)=> {
      obj[k] = _obj[k]
    });
    this.setKeysToLS(obj);
    this.setAppAuth(obj);
    this.setCookies(obj);
  }

  setAppAuth(obj) {
    Object.assign(this.auth, obj);
    Object.assign(this.auth.data, obj);
  }

  // при загрузке приложения инициализирую авторизацию из стоража/
  // ноде это нужно чтобы с сервера пришел  хедер с логином или без него
  initAuth() {
    if (!this.get('hash') && this.isBrowser) return;
    this.auth_keys.forEach((key: keyof AuthKeys)=> {
      this.auth[key] = this.get(key);
      this.auth.data[key] = this.auth[key]
    })
  }

  logout(toastText = 'Вы успешно вышли', toastLife = 4e3) {
    this.clearAuth();

    if(toastText) {
      this.toast.info('', toastText, {
        showCloseButton: true,
        toastLife
      });
    }

    //this.sharedService.emit['isLogIn'](false);
  }

  clearAuth() {
    this.reset();
    this.auth = new AuthData();
    this.deleteAuthCookies();
    this.handleLogout();
  }

  handleLogout() {
    this.router.navigate(['/'])
  }

  get(key) {
    if (this.isBrowser) {
      return (window.localStorage.getItem(this.storageKeyPrefix + key));
    } else {
      return this[key]
    }
  };

  deleteAuthCookies() {
    this.auth_keys.forEach(key=> {
      this.deleteCookie(key)
    })
  }

  set(key, value) {
    if (this.isBrowser) {
      return window.localStorage.setItem(this.storageKeyPrefix + key, value)
    } else {
      this[key] = value;
      this.auth[key] = value;
    }
  };

  removeItem(key) {
    window.localStorage.removeItem(this.storageKeyPrefix + key)
  };

  setKeysToLS(obj) {
    if (this.isBrowser) {
      for (let key in obj) {
        window.localStorage.setItem(this.storageKeyPrefix + key, obj[key])
      }
    } else {
      for (let key in obj) {
        this[key] = obj[key]
      }
    }
  };

  // возвращает cookie с именем name, если есть, если нет, то undefined
  getCookie(name, cookie) {
    if (!cookie) return;
    const c = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
    if (this.isBrowser) {
      const m = <RegExpMatchArray>document.cookie.match(c);
      return m ? decodeURIComponent(m[1]) : undefined;
    } else {
      const matches = <RegExpMatchArray>cookie.match(c);
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }


  }

  setCookie(name, value, options = <any>{expires: 100000000}) {

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
      let d = new Date();
      d.setTime(d.getTime() + expires * 1000);
      expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;

    for (let propName in options) {
      updatedCookie += "; " + propName;
      const propValue = options[propName];
      if (propValue !== true) {
        updatedCookie += "=" + propValue;
      }
    }

    document.cookie = updatedCookie;
  }

  setCookies(obj) {
    for (let key in obj) {
      this.setCookie(key, obj[key])
    }
  }

  // пишу нодой куки в стораж
  setCookiesToLS(obj) {
    if (this.getCookie('hash', obj)) {
      this.auth_keys.forEach(key=> {
        this.auth[key] = this.getCookie(key, obj);
        this.auth.data[key] = this.auth[key]
      })
    }
  }

  deleteCookie(name) {
    this.setCookie(name, "", {
      expires: -1
    })
  }

  reset() {
    window.localStorage.clear();
  }

}