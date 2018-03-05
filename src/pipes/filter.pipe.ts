/**
 * Created by ozknemoy on 05.03.2017.
 */
import { Pipe, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

@Injectable()
export class FilterPipe {

    private filterByString(filter) {
        if (filter) {
            filter = filter.toLowerCase();
        }
        return value => {
            return !filter || (value ? value.toLowerCase().indexOf(filter) !== -1 : false);
        }
    }

    private filterByBoolean(filter) {
        return value => {
            return Boolean(value) === filter;
        }
    }

    private filterByObject(filter, transformValueToString?) {

        return value => {
            for (let key in filter) {

                if (!value.hasOwnProperty(key) && !Object.getOwnPropertyDescriptor(Object.getPrototypeOf(value), key)) {
                    return false;
                }


                const val = transformValueToString? '' + this.getValue(value[key]) : this.getValue(value[key]);
                const type = typeof val/*filter[key]*/;
                let isMatching;

                if (type === 'boolean') {
                    isMatching = this.filterByBoolean(filter[key])(val);
                } else if (type === 'string') {
                    isMatching = this.filterByString(filter[key])(val);
                } else if (type === 'object') {
                    isMatching = this.filterByObject(filter[key])(val);
                } else {
                    isMatching = this.filterDefault(filter[key])(val);
                }

                if (!isMatching) {
                    return false;
                }
            }

            return true;
        }
    }

    /**
     * Checks function's value if type is function otherwise same value
     * @param value
     * @returns {any}
     */
    private getValue(value: any) {
        return typeof value === 'function' ? value() : value;
    }

    /**
     * Defatul filterDefault function
     *
     * @param filter
     * @returns {(value:any)=>boolean}
     */
    private filterDefault(filter) {
        return value => {
            return !filter || filter == value;
        }
    }

    private isNumber(value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    }

    public transform(array: any[], filter: any, transformValueToString = true): any {
        // transformValueToString нужен для того чтобы нивелировать расхождение в типе
        // когда инпуты преобразуют все вводимые данные в стринги
        const type = typeof filter;

        if (!array) {
            return array;
        }

        if (type === 'boolean') {
            return array.filter(this.filterByBoolean(filter));
        }

        if (type === 'string') {
            if (this.isNumber(filter)) {
                return array.filter(this.filterDefault(filter));
            }

            return array.filter(this.filterByString(filter));
        }

        if (type === 'object') {
            return array.filter(this.filterByObject(filter,transformValueToString));
        }

        if (type === 'function') {
            return array.filter(filter);
        }

        return array.filter(this.filterDefault(filter));
    }
}