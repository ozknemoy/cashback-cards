import {NgModule, Component, Inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpService} from "../../services/http.service";
import { AgmCoreModule } from '@agm/core';

interface IGeoPosition {
    coords: {
        accuracy: number,
        altitude: number,
        altitudeAccuracy: any,
        heading: any,
        latitude: number,
        longitude: number,
        speed: number,
    },
    timestamp: number,
}
interface IFreegeoIp {
    ip: string,
    country_code: string,
    country_name: string,
    region_code: string,
    region_name: string,
    city: string,
    zip_code: string,
    time_zone: "Europe/Moscow",
    latitude: number,
    longitude: number,
    metro_code: number,
}


@Component({
    selector: 'geo-view',
    styles: [`
  agm-map {
    height: 500px;
  }
  `],
    template: `
  <h3>{{orders?.need_bonus}}</h3>
  <agm-map [latitude]="lat || _lat" [longitude]="lng || _lng">
    <agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
  </agm-map>
  `
})
export class GeoComponent {
    orders;
    title:string = 'My first AGM project';
    lat:number;
    lng:number;
    // значения по умолчанию для центровки
    _lat:number = 60;
    _lng:number = 30;

    constructor(public http:HttpService) {
    }

    ngOnInit() {
        navigator.geolocation.getCurrentPosition(
            (position:IGeoPosition)=> {
                // клиент красавчик, разрешил геолокацию
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            }, (e)=> {
                this.withoutGeoOnlyOnce();
            }
        );

        // если еще не разрешили и не запретили геолокацию
        setTimeout(()=>this.withoutGeoOnlyOnce(),5e3)

    }

    withoutGeoOnlyOnce() {
        if(this.lat) return;
        //https://github.com/fiorix/freegeoip
        // комменты https://habrahabr.ru/company/hflabs/blog/340466/
        this.http.getGlobal('https://freegeoip.net/json/')
            .toPromise()
            .then((d:IFreegeoIp)=> {
                this.lat = d.latitude;
                this.lng = d.longitude;
            })
    }

}

@NgModule({
    declarations: [GeoComponent],
    imports: [
        RouterModule.forChild(<any>[
            {path: '', component: GeoComponent, pathMatch: 'full'}
        ]),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD3LusG3ps3C' + 'gXLBUiMHbpyfQPBA6VTEac'//https://console.developers.google.com/apis/credentials?project=my-project-1520354209044&authuser=0
        })
    ]
})
export class GeoModule {

}
