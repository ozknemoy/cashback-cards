/**
 * Created by ozknemoy on 21.03.2018.
 */

import {locales} from './main'

let _crimea = {};
for (let prop in locales) {
  _crimea[prop] = locales[prop][1]
}

export const crimea = _crimea;

