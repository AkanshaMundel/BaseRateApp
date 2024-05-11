interface FieldData<T = string> {
    value: T;
    error?: string;
    isValid?: boolean;
}

type Validator = (data: string) => string | undefined;

class FieldDataClass {
    validator?: Validator;
    constructor(data: string, validator?: Validator[]) { }
    getData(): string;
    hasError(): boolean { };
    getError(): string | undefined { }
    clearError(): void { }
    setValue(value: string): void { }
    getValue(): string { }
    hasChanged(): boolean { }
    isVaild(): boolean { }
    validate(): boolean { }

    hasTouched(): boolean { }
}