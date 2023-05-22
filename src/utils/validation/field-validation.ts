import { AppError } from "../../infra/http/errors/app-error";

export class FieldValidation {
    private field_value: any;
    private field_name: string;

    constructor(field_value: any, field_name: string) {
        this.field_value = field_value;
        this.field_name = field_name;
    }

    checkNull() {
        if (!this.field_value) {
            throw new AppError(`${this.field_name} must not me NULL`, 400);
        }
    }

    checkLength(length: Number) {
        this.checkString();

        if ((this.field_value as String).length < length) {
            throw new AppError(`${this.field_name} length must be >= ${length}`, 400);
        }
    }

    checkString() {
        if (typeof(this.field_value) != "string") {
            throw new AppError(`${this.field_name} must be a STRING`, 400);
        }
    }
}