import { Round } from "./round";
import { User } from "./user";

export class Game {
    id: string;
    startDate: Date;
    endDate: Date;
    user1Id: string;
    user1: User;
    user2Id: string;
    user2: User;
    rounds: Round[];
}