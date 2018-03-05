/**
 * Created by ozknemoy on 25.03.2017.
 */
export function isBrowser() {
    return typeof window !== 'undefined';
    /*try {
        return !!(window)
    } catch (e) {
        return false
    }*/
}