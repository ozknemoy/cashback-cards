import {Component, OnInit, Inject} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;
  public users: any;

  constructor(
      private http: HttpService
  ) {

  }

  ngOnInit() {
    this.http.globalGet('https://api.github.com/users').toPromise().then(d=> {
      this.users = d
    });

  }


}

