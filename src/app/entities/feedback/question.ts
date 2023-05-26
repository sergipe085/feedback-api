interface ICreateQuestionDTO {
    id?: string;
    content: string;
    created_at: Date;
    deleted_at: Date | null;
}

export class Question {
    id?: string;
    content: string;
    created_at: Date;
    deleted_at: Date | null;

    constructor({ id, content, created_at, deleted_at }: ICreateQuestionDTO) {
        this.id = id
        this.content = content;
        this.created_at = created_at;
        this.deleted_at = deleted_at;
    }
}