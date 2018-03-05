/**
 * Created by ozknemoy on 10.01.2017.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'thousand'})

export class ThousandPipe  {
    transform(nStr:number, args?: any[]):string {
        
        if (nStr==0 || nStr===null) return '0';
        if (!nStr) return;
        //nStr += '';
        var x = (nStr+'').split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ' ' + '$2');
        }
        return x1 + x2;
    }
}