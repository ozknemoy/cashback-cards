//https://cabbageapps.com/fell-love-js-decorators/

export function canActivate() {
  return function (target: any, propName: string, descriptor: TypedPropertyDescriptor<any>) {
    let method = descriptor.value;

    descriptor.value = function () {
      console.log('22222', this);
      // передаю управление целевому методу
      method.apply(this, arguments);

    };


  }
}

/*
export function propDecorator() {
  return function (target: any, propName: string) {
    let val = target[propName];


    Object.defineProperty(target, propName, {
      get: function () {
        console.log('____22222');
        return 2 + val
      },
      set: function (newVal) {
        val = newVal;
      },
      configurable: true,
      writable: false
    });

    console.log('+++++++++++++++++++set'   );
  }
}*/
