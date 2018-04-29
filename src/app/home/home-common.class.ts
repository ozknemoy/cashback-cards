import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {HttpService} from "../../services/http.service";
import {SeoService} from "../../services/seo.service";

export class HomeCommonComponent {
  public message: string;
  public users: any;
  public reklamaUrl = 'ya.ru';//window.location.host;
  public adminH1 = '«Арена» — это карта болельщика, которая дает возможность оказаться в центре спортивных событий на самых выгодных условиях! ';

  constructor(
    protected httpService: HttpService,
    public authLocalStorage: AuthLocalStorage,
    public seoService: SeoService,
  ) {}

  ngOnInit() {
    /*this.httpService.globalGet('https://api.github.com/users').toPromise().then(d=> {
      this.users = d
    });*/
    this.seoService.handleOne('main')
  }


}