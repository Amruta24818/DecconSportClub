import { IBatches } from "./IBatches";
import { IUser } from "./IUser";

export interface IComments{
    comment_id: number,
    comments: string,
    batch_id: IBatches,
    user_id: IUser
}