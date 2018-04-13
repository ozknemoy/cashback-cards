import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'card'})
export class CardPipe  {
  transform(nStr: string): string {
    if (!nStr) return;
    nStr += '';
    const rgx = /(\d+)(\d{4})/;
    while (rgx.test(nStr)) {
      nStr = nStr.replace(rgx, '$1' + ' ' + '$2');
    }
    return nStr;
  }
}
