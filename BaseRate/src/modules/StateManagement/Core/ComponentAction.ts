import StateUtils from "./StateUtils";

export default class ComponentActions<T>{
    protected stateUtils: StateUtils<T>;
    constructor(state: T, fn: (setter: (oldState: T) => T) => void) {
        this.stateUtils = new StateUtils<T>(state, fn);
    }
}