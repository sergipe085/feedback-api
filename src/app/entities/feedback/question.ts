interface ICreateQuestionDTO {
    id?: string;
    content: string;
}

export class Question {
    id?: string;
    content: string;

    constructor({ id, content }: ICreateQuestionDTO) {
        this.id = id
        this.content = content;
    }
}