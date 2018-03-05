/**
 * Created by ozknemoy on 02.03.2018.
 */
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Inject,Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class LocalStorage {
    public hash: string;// для ноды
    public auth = {data:{}};
    storageKeyPrefix:string = 'prioriti-';
    public auth_keys = ['hash', /*'id',*/ 'first_name', 'last_name', 'middle_name'];

    public isBrowser:boolean = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router
    ) {
        this.initAuth();
    }

    setAuth(obj) {
        this.setKeys(obj);
        this.setAppAuth(obj);
        this.setCookies(obj);
    }

    setAppAuth(obj) {
        Object.assign(this.auth,obj);
        Object.assign(this.auth.data,obj);
    }

    // при загрузке приложения инициализирую авторизацию из стоража/
    // ноде это нужно чтобы с сервера пришел  хедер с логином или без него
    initAuth() {
        if(!this.get('hash') && this.isBrowser) return;
        this.auth_keys.forEach(key=> {
            this.auth[key] = this.get(key);
            this.auth.data[key] = this.auth[key]
        })
    }

    clearAuth() {
        this.reset();
        this.auth = {data:{}};
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

    setKeys(obj) {
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
        if(!cookie) return;
        const c = new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)");
        if (this.isBrowser) {
            var m = <RegExpMatchArray>document.cookie.match(c);
            return m ? decodeURIComponent(m[1]) : undefined;
        } else {
            var matches = <RegExpMatchArray>cookie.match(c);
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }


    }

    setCookie(name, value, options=<any>{expires:100000000}) {

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }

    setCookies(obj) {
        for(let key in obj) {
            this.setCookie(key,obj[key])
        }
    }

    // пишу нодой куки в стораж
    setCookiesToLS(obj) {
        if(this.getCookie('hash',obj)) {
            this.auth_keys.forEach(key=> {
                this.auth[key] = this.getCookie(key,obj);
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