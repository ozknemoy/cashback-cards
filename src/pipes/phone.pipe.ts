import { Pipe } from '@angular/core';

@Pipe({name: 'phone'})
export class PhonePipe  {
  transform(nStr: string): string {
    if (!nStr) return;
    if(nStr.indexOf('(') > -1 || nStr.indexOf('-') > -1 || nStr.indexOf(' ') > -1) return nStr;
    let arrStr = ('' + nStr).split('');
    arrStr.splice(-2, 0, '-');
    arrStr.splice(-5, 0, '-');
    arrStr.splice(-9, 0, ') ');
    arrStr.splice(1, 0, ' (');
    return arrStr.join('');
  }
}
