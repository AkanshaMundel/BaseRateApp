export default class FieldDataClass {
    private data: string = '';
    private value: string = '';
    private error?: string = undefined;
    private touched: boolean = false;
    validator?: Validator;
    constructor(data: string, validator?: Validator) {
        this.data = data;
        this.validator = validator;
    }
    getData() {
        return this.data;
    }
    hasError() {
        return this.error !== undefined;
    }
    getError() {
        return this.error;
    }
    setError(message?: string) {
        this.error = message;
    }
    clearError() {
        this.error = undefined;
    }
    setValue(value: string) {
        this.touched = true;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    hasChanged() {
        return this.data !== this.value.trim();
    }
    isVaild() {
        return this.touched && !this.error;
    }
    validate() {
        const validator = this.validator;
        const value = this.value;
        if (validator) {
            this.error = validator(value);
            return this.error == undefined;
        }
        return true;
    }
    hasTouched() {
        return this.touched;
    }
}
