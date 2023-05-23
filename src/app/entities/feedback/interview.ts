interface ICreateInterviewDTO {
    id?: number;
}

export class Interview {
    id?: number;

    constructor({ id }: ICreateInterviewDTO) {
        this.id = id
    }
}