/**
 * Created by ozknemoy on 10.01.2017.
 */
import { Pipe } from '@angular/core';

@Pipe({name: 'fromDateToDate'})
export class FromDateToDatePipe  {
    transform(array:any[], st: string, en: string, key = 'date'):any[] {
      // todo isWithinRange 'date-fns'
      if (!array) return undefined;
      if(!st&&!en) return array;
      const start = st? +new Date(st):0;
      const end = en? +new Date(en):+new Date('2222-11-11');

      return array.filter(item => {
        let med = +new Date(item[key]);
        return med>=start && med<=end
      })
    }
}