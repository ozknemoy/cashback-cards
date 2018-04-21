/**
 * Created by ozknemoy on 21.03.2018.
 */

import {locales} from './main'

let _arenasport = {};
for(let prop in locales) {
    _arenasport[prop] = locales[prop][0]
}

export const arenasport = _arenasport;

