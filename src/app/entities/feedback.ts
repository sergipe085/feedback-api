import { User } from "./user";

interface ICreateFeedbackDTO {
    id?: string;
    user_id: string;
    note: number;
    obs: string;
}

export class Feedback {
    id?: string;
    user: User;
    user_id: string;
    note: number;
    obs: string;

    constructor({ id, user_id, note, obs }: ICreateFeedbackDTO) {
        this.id = id
        this.user_id = user_id;
        this.note = note;
        this.obs = obs
    }
}