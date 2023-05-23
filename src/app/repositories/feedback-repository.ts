import { Response } from "../entities/feedback/response";

export abstract class ResponseRepository {
    abstract save(response: Response): Promise<Response>;
    abstract findAll(): Promise<Response[]>;
}