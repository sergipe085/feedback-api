interface ICreateResponseDTO {
    id?: string;
    interview_id: number;
    question_id: string;
    note: number;
    obs: string;
}

export class Response {
    id?: string;
    interview_id: number;
    question_id: string;
    note: number;
    obs: string;

    constructor({ id, interview_id, question_id, note, obs }: ICreateResponseDTO) {
        this.id = id
        this.interview_id = interview_id;
        this.question_id = question_id;
        this.note = note;
        this.obs = obs;
    }
}