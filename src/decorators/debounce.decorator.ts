/**
 * Created by ozknemoy on 17.03.2018.
 */


export function debounceMethod(ms: number, applyAfterDebounceDelay = true) {

    let timeoutId;
    let debounceOff = true;
    let targetThis;

    return function (target: any, propName: string, descriptor: TypedPropertyDescriptor<any>) {
        let method = descriptor.value;// или target[propName];

        function setTimeout(_args) {
            debounceOff = false;
            timeoutId = window.setTimeout(() => {
                if (applyAfterDebounceDelay) {
                    method.apply(targetThis, _args);
                }
                timeoutId = null;
                debounceOff = true;
            }, ms);
        }

        descriptor.value = function (...args: any[]) {
            targetThis = this;
            if (!timeoutId) {
                setTimeout(args);
            }
            else if (timeoutId && !debounceOff) {
                window.clearTimeout(timeoutId);
                setTimeout(args);
            }

            if (!applyAfterDebounceDelay) {
                return method.apply(this, args);
            }
        };

        /*оригинал
        вызывает функцию раз в 3 секунды
        let method = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (timeoutId) return;
            timeoutId = window.setTimeout(() => {
                if (applyAfterDebounceDelay) {
                    method.apply(this, args);
                }
                timeoutId = null;
            }, ms);

            if (!applyAfterDebounceDelay) {
                return method.apply(this, args);
            }
        }*/
    }
}