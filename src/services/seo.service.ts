import {Inject, Injectable} from '@angular/core';
import {AuthLocalStorage} from "./auth-local-storage.service";
import {HttpService} from "./http.service";
import {Meta, Title} from "@angular/platform-browser";
import {FRONT_ARENASPORT_URL, FRONT_CRIMEA_URL} from "../config/base_url";

export interface SeoResponse {
  id: number;
  class_name: string;
  object_id?: any;
  title: string;
  description: string;
  image: string;
  robots?: string;
  path: string;
}

@Injectable()
export class SeoService {
  private readonly baseSeoUrl = 'handbooks/seo?path=';
  private readonly photoFolder = '/files/images/seo/';
  private readonly isServer = !this.authLocalStorage.isBrowser;
  // надо откинуть бекенд часть
  public HOST = this.isArenasport? FRONT_ARENASPORT_URL : FRONT_CRIMEA_URL;

  constructor(public httpService: HttpService,
              private titleService: Title,
              public meta: Meta,
              @Inject('isArenasport') public isArenasport: boolean,
              public authLocalStorage: AuthLocalStorage) {

  }
  /*В админке блок SEO он создает только для блоков, у которых нет сущностей, типо списка магазинов и главная,
   для магазинов в добавлении и редактировании добавлены поля для сео по описанию из файла Дениса.

/v1/handbooks/seo?path=main.XXX.YYY main.shop.3
где path это либо main тогда вернет сео для главной, либо main.НАЗВАНИЕ_СУЩНОСТИ вернет сео для главной и
 сео для сушности, либо main.НАЗВАНИЕ_СУЩНОСТИ.ИД_СУЩНОСТИ тогда вернет тоже + сео для конкретного обьекта*/

  handleOne(chunkUrl: string, i?) {
    // todo если показывать и браузеру то надо делать не addTags a update
    if(this.isServer) {// todo сделать наоборот
      this.httpService.get(this.baseSeoUrl + chunkUrl).subscribe((seo: SeoResponse[])=> {
        if(seo && seo.length) this.handleSeoResponse(seo[i? i : seo.length-1]);
        else this.meta.addTag({property: 'seoerror', content: 'empty seo data'})
      }, err=> this.meta.addTag({property: 'seoerror', content: JSON.stringify(err)}))
    }
  }

  handleSeoResponse(seo: SeoResponse) {
    const localUrl = this.authLocalStorage.nodeData.localUrl;
    this.meta.addTags([
      {property: 'og:image', content: this.HOST + this.photoFolder + seo.image},
      {property: 'og:description', content: seo.description},
      {name: 'description', content: seo.description},
      {property: 'og:title', content: seo.title},
      {property: 'og:url', content: this.HOST + localUrl},
      {property: 'og:see_also', content: this.HOST + localUrl},
      {name: 'ROBOTS', content: seo.robots},
    ]);
    this.titleService.setTitle(seo.title);
  }
  /*
  пример с тестового
http://service.card.prioriticlub.ru/v1/handbooks/seo?path=main.shop.3
вернет
[
      {
      "id": 1,
      "class_name": null,
      "object_id": null,
      "title": "Главная страница",
      "description": "Описание главной",
      "image": null,
      "robots": null,
      "path": "main"
   },
      {
      "id": 2,
      "class_name": "shop",
      "object_id": null,
      "title": "Тут типо заголовок для страницы магазинов",
      "description": "Тут типо описание для страницы магазинов",
      "image": "_0VcZFozYvo.jpg",
      "robots": "тут типо роботы",
      "path": "main.shop"
   },
      {
      "id": 4,
      "class_name": "shop",
      "object_id": 3,
      "title": "test title",
      "description": "test desc",
      "image": "1b9b85dd0e69f610801f27e47e900967.jpg",
      "robots": "test robots",
      "path": "main.shop.3"
   }
]
  */


}
