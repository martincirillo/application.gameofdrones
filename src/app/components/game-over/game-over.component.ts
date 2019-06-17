import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  public gameId: string;
  public winner: User;
  public isLoading: boolean = true;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private gameService: GameService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params['gameId'];
    this.gameService.getWinner(this.gameId).subscribe(
      (user: User) => {
        this.winner = user;
        this.isLoading = false;
      }, error => {
        this.alertService.error("There was a problem when trying to get the winner of the game");
      }
    )
  }

  restart(){
    this.router.navigate(["/"]);
  }
}
