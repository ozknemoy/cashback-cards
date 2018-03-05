/**
 * Created by ozknemoy on 14.01.2017.
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import {HttpService} from "./http.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public router: Router,
        public $auth: HttpService
    ) {}

    canActivate() {
        if (!this.$auth.isAuth()) {
            console.log("AuthGuard  notAuth");
            this.router.navigate(['']);
            return false
        }
        else {
            console.log("AuthGuard  isAuth");
            return true
        }


    }

}