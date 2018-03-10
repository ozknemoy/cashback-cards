import {NgModule, Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {AgmCoreModule, LatLngBounds, LatLngLiteral} from '@agm/core';

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
    selector: 'geo-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
  agm-map {
    height: 500px;
  }
  `],
    template: `
  <agm-map [zoom]="11" [latitude]="lat || _lat" [longitude]="lng || _lng"
           (centerChange)="centerChange($event)"
           (boundsChange)="boundsChange($event)"
           (zoomChange)="zoomChange($event)">
    <agm-marker [latitude]="lat" [longitude]="lng" [label]="'I'">
        <agm-info-window [disableAutoPan]="true">
           это <strong>ПИТЕР</strong>
        </agm-info-window>
    </agm-marker>
  </agm-map>
  `
})
export class GeoComponent implements OnInit {
    orders;
    title = 'My first AGM project';
    lat: number;
    lng: number;
    // значения по умолчанию для центровки
    _lat = 60;
    _lng = 30;

    constructor(public http: HttpService) {}

    dummi() {
          console.log('dummi');
    }
    getN() {
          return Math.random();
    }

    centerChange(e: LatLngLiteral) {
          console.log('---', e);
    }

    zoomChange(zoom: number) {
        console.log(zoom);
    }

    boundsChange(event: LatLngBounds) {
         console.log('+++', event);
         console.log('+++cent',  event.getCenter().lat(), event.getCenter().lng());
         console.log('+++NorthEast',  event.getNorthEast().lat(), event.getNorthEast().lng());
         console.log('+++getSouthWest',  event.getSouthWest().lat(), event.getSouthWest().lng());
    }

    ngOnInit() {
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

    withoutGeoOnlyOnce() {
        if (this.lat) { return; }
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
export class GeoModule {

}
