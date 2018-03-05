/**
 * Created by ozknemoy on 12.06.2017.
 */
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs/Observable';

@Injectable()
export class CanDeactivateGuard {
    canDeactivate(component: any) {
        return component.canDeactivate()
    }
}