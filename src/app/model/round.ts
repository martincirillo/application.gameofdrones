import { Game } from "./game";

export class Round {
    id: string;
    number: number;
    gameId: string;
    game: Game;
    user1Choise: number;
    user2Choise: number;
}