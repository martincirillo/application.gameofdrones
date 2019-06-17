import { Component, OnInit, Input } from '@angular/core';
import { Round } from 'src/app/model/round';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/model/game';
import { User } from 'src/app/model/user';
import { PlayChoise } from 'src/app/model/playChoise';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit {
  @Input() gameId: string;
  @Input() currentRoundId: string;
  public game: Game;
  public isLoading: boolean = true;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGameById(this.gameId).subscribe(
      (g: Game) => {
        this.game = g;
        let rounds: Round[] = [];
        for (let x: number = 0; x < this.game.rounds.length; x++) {
          if (this.game.rounds[x].id != this.currentRoundId) {
            rounds.push(this.game.rounds[x]);
          }
        }

        this.game.rounds = rounds.sort((firstRound: Round, secondRound: Round): number => {
          if (firstRound.number < secondRound.number) {
            return -1;
          }

          if (firstRound.number > secondRound.number) {
            return 1;
          }

          return 0
        });

        this.isLoading = false;
      }
    )
  }

  getRoundWinner(round: Round): string {
    if (round.user1Choise == round.user2Choise) {
      return "Tie";
    }

    switch (round.user1Choise) {
      case <number>PlayChoise.Paper:
        return round.user2Choise == <number>PlayChoise.Scissors ? this.game.user2.userName : this.game.user1.userName;

      case <number>PlayChoise.Rock:
        return round.user2Choise == <number>PlayChoise.Paper ? this.game.user2.userName : this.game.user1.userName;

      case <number>PlayChoise.Scissors:
        return round.user2Choise == <number>PlayChoise.Rock ? this.game.user2.userName : this.game.user1.userName;
    }
  }
}
