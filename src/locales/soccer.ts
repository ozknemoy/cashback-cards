/**
 * Created by ozknemoy on 21.03.2018.
 */

import {locales} from './main'

let _soccer = {};
for(let prop in locales) {
    _soccer[prop] = locales[prop][0]
}

export const soccer = _soccer;

