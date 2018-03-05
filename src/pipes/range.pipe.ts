/**
 * Created by ozknemoy on 27.09.2017.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'range'})

export class RangePipe  {
    transform(array: any[], prop: string, start: string, end: string):any[] {
        if (!array) {
            return array;
        }
        const _start = !start || isNaN(parseFloat(start))? -Infinity : parseFloat(start);
        const _end = !end || isNaN(parseFloat(end))? Infinity : parseFloat(end);

        return array.filter( (item) => {
            return item[prop] >= _start && item[prop] <= _end
        })
    }
}