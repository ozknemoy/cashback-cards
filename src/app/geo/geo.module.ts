import {NgModule, Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {AgmCoreModule, LatLngBounds, LatLngLiteral} from '@agm/core';
import {AutoUnsubscribe} from "../../decorators/auto-unsubscribe.decorator";
import {AuthLocalStorage} from "../../services/auth-local-storage.service";
import {debounceMethod} from "../../decorators/debounce.decorator";


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

@AutoUnsubscribe()
@Component({
    selector: 'geo-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
  agm-map {
    height: 300px;
  }
  .map-holder {
      margin: 0 25px 0 200px;
  }
  `],
    template: `
  <div class="map-holder"><agm-map [zoom]="11" [latitude]="lat || _lat" [longitude]="lng || _lng"
           (centerChange)="centerChange($event)"
           (boundsChange)="boundsChange($event)"
           (zoomChange)="zoomChange($event)">
    <agm-marker [latitude]="lat" [longitude]="lng" [label]="'Я'">
        <agm-info-window [disableAutoPan]="true">
           это <strong>ПИТЕР</strong>
        </agm-info-window>
    </agm-marker>
  </agm-map></div>
  `
})
export class GeoComponent implements OnInit {
    orders;
    public lat: number;
    public lng: number;
    // значения по умолчанию для центровки
    public _lat = 60;
    public _lng = 30;
    public zoom:number;
    public ne:LatLngLiteral;
    public sw:LatLngLiteral;
    public center:LatLngLiteral;
    public isBrowser = this.authLocalStorage.isBrowser;

    constructor(
        public http: HttpService,
        public authLocalStorage: AuthLocalStorage) {}

    centerChange(center: LatLngLiteral) {
        this.center = center;
        this.getPoints();
    }

    zoomChange(zoom: number) {
        this.zoom = zoom;
    }

    boundsChange(event: LatLngBounds) {
        this.getPoints();
        this.ne = {lat:event.getNorthEast().lat(), lng: event.getNorthEast().lng()};
        this.sw = {lat:event.getSouthWest().lat(), lng: event.getSouthWest().lng()};
    }

    @debounceMethod(1000)
    getPoints() {
        console.log('+++NorthEast',this.ne );
        console.log('+++getSouthWest',this.sw );
        console.log('+++zoom',this.zoom);
        console.log('+++center',this.center);
    }

    ngOnInit() {
        if(this.isBrowser) {
            navigator.geolocation.getCurrentPosition(
                (position: IGeoPosition) => {
                    // клиент красавчик, разрешил геолокацию
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

@NgModule({
    declarations: [GeoComponent],
    imports: [
        RouterModule.forChild(<any>[
            {path: '', component: GeoComponent, pathMatch: 'full'}
        ]),
        AgmCoreModule.forRoot({
            // https://console.developers.google.com/apis/credentials?project=my-project-1520354209044&authuser=0
            apiKey: 'AIzaSyD3LusG3ps3C' + 'gXLBUiMHbpyfQPBA6VTEac'
        })
    ]
})
export class GeoModule {}
