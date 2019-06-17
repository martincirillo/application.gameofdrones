import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { Router } from '@angular/router';
import { RoundService } from 'src/app/services/round.service';
import { Round } from 'src/app/model/round';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {
  public userName1: string;
  public userName2: string;

  constructor(
    private router: Router, 
    private userService: UserService, 
    private gameService: GameService, 
    private roundService: RoundService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  startGame() {
    if (this.validate()) {
      let user1: User = new User();
      user1.userName = this.userName1;

      let user2: User = new User();
      user2.userName = this.userName2;

      this.userService.addUser(user1).subscribe(
        (u1: User) => {
          this.userService.addUser(user2).subscribe(
            (u2: User) => {
              let game: Game = new Game();
              game.user1Id = u1.id;
              game.user2Id = u2.id;
              this.gameService.addGame(game).subscribe(
                (g: Game) => {
                  this.roundService.getNextRound(g.id).subscribe(
                    (r: Round) => {
                      this.router.navigate(["/play/" + r.id]);
                    }
                  )
                },
                error => {
                  this.alertService.error("There was a problem when trying to start the game");
                }
              )
            },
            error => {
              this.alertService.error("There was a problem when trying to create the second player");
            }
          )
        },
        error => {
          this.alertService.error("There was a problem when trying to create the first player");
        }
      );
    }else{
      this.alertService.error("Both players should be entered in order to start the game")
    }
  }

  private validate(): boolean {
    return this.userName1 != undefined && this.userName1 != null && this.userName1.trim() != "" &&
      this.userName2 != undefined && this.userName2 != null && this.userName2.trim() != "" &&
      this.userName1.trim() != this.userName2.trim();
  }
}
