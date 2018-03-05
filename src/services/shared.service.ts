/**
 * Created by ozknemoy on 24.03.2017.
 * пробрасывает в другой компонент данные
 */

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {LocalStorage} from "./localStorage.service";

@Injectable()
export class SharedService {

    public listener = {};
    public emit = {};
    constructor(public localStorage:LocalStorage) {
        this.makeProxy(
            'isLogIn',
            this.localStorage.isBrowser
                ? this.localStorage.get('hash')
                : this.localStorage.auth['hash']
        );
    }

    /* это просто для примера для удобства понимания что делать
    private emitMessageSource;
    public messageListener$;
    public emitMessage;

    makeMessageListener() {
        this.emitMessageSource = new Subject<any>();
        this.messageListener$ = this.emitMessageSource.asObservable();
        this.emitMessage = (newValue: any) => {
            this.emitMessageSource.next(newValue);
        }
    }
    killMessageListener() {
        this.emitMessageSource = undefined;
        this.messageListener$ = undefined;
        this.emitMessage = undefined
    }*/

    // 1)в родителе создать слушателя: this.sharedService.makeProxy('Message');
    // 2)подписаться: this.message$ = this.sharedService.listener['Message'].subscribe(text => {console.log(text);});
    // 3)в ребенке:  отослать данные this.sharedService.emit['Message']('Data from child');
    // 4)в родителе не забыть убить слушателя: this.sharedService.killListener('Message')

    makeProxy(name:string,dataSubject={}) {
        /*
        * if you have a component that listens to the isLoggedIn Observable after we already
        * call the next method, with simple Observable or Subject the component will not
        * get any data. That’s why we need the BehaviorSubject
        * BehaviorSubject's encapsulate all of the functionality of Subject, but also return the last emitted value to subscribers upon subscription. This means components and services will always have access to the latest (or initial) application state and all future updates.
        *
        * Mark Pieszak comment
          use .share() when creating the Observable, so that your async pipes
          don’t create multiple subscriptions.
         isLoggedIn() : Observable<boolean> {
         return this.isLoginSubject.asObservable().share();
         }
        */
        this['emitSource' + name] = new BehaviorSubject<any>(dataSubject);
        // сюда подписываемся и ...
        this.listener[name] = this['emitSource' + name].asObservable().share();
        // ... обновляем значение
        this.emit[name] = (newValue: any, save = false, handler?) => {
            this['emitSource' + name].next(newValue);
            if(save) this.setState(name,newValue)
        }
    }

    killListener(name) {
        this['emitSource' + name] = undefined;
        this.listener[name] = undefined;
        this.emit[name] = undefined
    }

    setState(name,newValue) {
        this['state' + name] = JSON.parse(JSON.stringify(newValue))
    }

    getState(name) {
        return this['state' + name]
    }

}