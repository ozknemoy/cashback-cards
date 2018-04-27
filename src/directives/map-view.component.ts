import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {HttpService} from '../services/http.service';
import {LatLngBounds, LatLngLiteral} from '@agm/core';
import {AutoUnsubscribe} from "../decorators/auto-unsubscribe.decorator";
import {AuthLocalStorage} from "../services/auth-local-storage.service";
import {debounceMethod} from "../decorators/debounce.decorator";
import {IPartner} from "../app/partners/partner.model";


interface IGeoPosition {
  coords: {
    accuracy: number,
    altitude: number,
    altitudeAccuracy: any,
    heading: any,
    latitude: number,
    longitude: number,
    speed: number,
  };
  timestamp: number;
}
interface IFreegeoIp {
  ip: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip_code: string;
  time_zone: 'Europe/Moscow';
  latitude: number;
  longitude: number;
  metro_code: number;
}

@Component({
  selector: 'map-view',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
  agm-map {
    height: 450px;
    width: 100%;
  }
  `],
  template: `
  <agm-map [zoom]="zoom" [latitude]="lat || _lat" [longitude]="lng || _lng"
           (boundsChange)="boundsChange($event)"
           (zoomChange)="zoomChange($event)">
    <agm-marker [latitude]="lat" [longitude]="lng" [label]="'Я'">
        <agm-info-window [disableAutoPan]="true">
           это Вы
        </agm-info-window>
    </agm-marker>
    <agm-marker *ngFor="let point of points" [latitude]="point.lat" [longitude]="point.lon" [label]="'I'">
      <agm-info-window [disableAutoPan]="true">
        <a routerLink="/partner/{{point.id}}">{{point.name}}</a> <br>
        {{point.phone}}<br>
        {{point.address}}
      </agm-info-window>
    </agm-marker>
  </agm-map>
  `
})
@AutoUnsubscribe()
export class MapViewComponent implements OnInit {
  @Input()
  public points: IPartner;
  @Output()
  onBoundsChange: EventEmitter<any> = new EventEmitter();
  public lat: number;
  public lng: number;
  // значения по умолчанию для центровки
  public _lat = 60;
  public _lng = 30;
  public zoom:number = 11;
  public ne;
  public sw;
  public showLeftPannel = false;
  public center:LatLngLiteral;
  public isBrowser = this.authLocalStorage.isBrowser;

  constructor(
    public http: HttpService,
    public authLocalStorage: AuthLocalStorage
  ) {}

  ngOnChanges() {
    setTimeout(()=>this.showLeftPannel = true, 2000);
  }

  zoomChange(zoom: number) {
    //this.zoom = zoom;
    //this.getPoints();
  }

  @debounceMethod(800)
  boundsChange(event: LatLngBounds) {
    //const ne = {lat:event.getNorthEast().lat(), lon: event.getNorthEast().lng()};
    //const sw = {lat:event.getSouthWest().lat(), lon: event.getSouthWest().lng()};
    const ne = [event.getNorthEast().lat(), event.getNorthEast().lng()];
    const sw = [event.getSouthWest().lat(), event.getSouthWest().lng()];
    //console.log('+++NorthEast',ne );
    //console.log('+++getSouthWest',sw );
    this.onBoundsChange.emit({ne,sw})
  }



  ngOnInit() {
    if(this.isBrowser) {
      navigator.geolocation.getCurrentPosition(
        (position: IGeoPosition) => {
          // клиент разрешил геолокацию
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        }, (e) => {
          this.withoutGeoOnlyOnce();
        }
      );

      // если еще не разрешили и не запретили геолокацию
      setTimeout(() => this.withoutGeoOnlyOnce(), 5e3);
    }


  }

  withoutGeoOnlyOnce() {
    if (this.lat) return;
    // https://github.com/fiorix/freegeoip
    // комменты https://habrahabr.ru/company/hflabs/blog/340466/
    this.http.getGlobal('https://freegeoip.net/json/')
      .toPromise()
      .then((d: IFreegeoIp) => {
        this.lat = d.latitude;
        this.lng = d.longitude;
      });
  }

}


