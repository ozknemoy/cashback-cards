/**
 * Created by ozknemoy on 16.04.2017.
 * In typescript or babel, a class decorator is just a function that
 * takes one parameter, the constructor of the decorated class.
 * The class decorator is applied to the constructor of the class and
 * can be used to observe, modify, or replace a class definition.
 *
 * принимает массив строк свойств от которых не надо отписываться
 */

export function AutoUnsubscribe( blackList:any = [] ) {

    return function ( constructor ) {
        const original = constructor.prototype.ngOnDestroy;

        constructor.prototype.ngOnDestroy = function () {
            for ( let prop in this ) {
                const property = this[ prop ];
                if (!blackList.includes(prop) && property && typeof property.unsubscribe === "function") {
                    property.unsubscribe();
                }
            }
            original && typeof original === 'function' && original.apply(this, arguments);
        };
    }

}