import { IBatches } from "./IBatches";
import { IUser } from "./IUser";

export interface ILike{
    like_id: number,
    batch_id: IBatches,
    user_id: IUser,
}