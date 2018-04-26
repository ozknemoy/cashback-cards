/**
 * Created by ozknemoy on 10.01.2017.
 */
import {Pipe} from '@angular/core';

@Pipe({name: 'thousand'})

export class ThousandPipe {
  transform(nStr: number, args?: any[]): string {

    if (nStr == 0 || nStr === null) return '0';
    if (!nStr) return;
    //nStr += '';
    const x = (nStr + '').split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
  }
}