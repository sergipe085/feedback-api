import { Feedback } from "../../entities/feedback";
import { User } from "../../entities/user";
import { FeedbackRepository } from "../../repositories/feedback-repository";

interface IGiveFeedbackUseCaseProps {
    user: User,
    note: number,
    obs: string
}

export class GiveFeedbackUseCase {
    constructor(private feedbackRepository: FeedbackRepository) {}

    async execute({ user, note, obs }: IGiveFeedbackUseCaseProps) {
        const new_feedback = new Feedback({
            user_id: user.id ?? "", note, obs
        });

        const saved_feedback = await this.feedbackRepository.save(new_feedback)
        return saved_feedback
    }
}