import {Injectable} from '@angular/core';
import {parse, format} from 'date-fns'

@Injectable()
export class HandleDataService {

  constructor() {}

  dateToServer(date: Date) {
    if(!date) return null;
    return format(date, 'YYYY-MM-DD')
  }

  dateFromServer(date: string) {
    if(!date) return null;
    return parse(date)
  }

  /**
   * возвращает массив между двумя датами
   * метод для repeat
   * по умолчанию берет из массива свойство date
   * можно удалять обе или одну дату
   */
  fromDateToDate(array,st,en,key='date') {//tested cs
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