import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Round } from 'src/app/model/round';
import { User } from 'src/app/model/user';
import { RoundService } from 'src/app/services/round.service';
import { AlertPromise } from 'selenium-webdriver';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-display-winner',
  templateUrl: './display-winner.component.html',
  styleUrls: ['./display-winner.component.css']
})
export class DisplayWinnerComponent implements OnInit {
  private round: Round;
  private winner: User;

  public isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roundService: RoundService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.roundService.getRoundById(this.route.snapshot.params['roundId']).subscribe(
      (r: Round) => {
        this.round = r;
        this.roundService.verifyRound(r).subscribe(
          (user: User) => {
            this.winner = user;
            if (this.winner == null || this.winner == undefined) {
              this.winner = new User();
              this.winner.userName = "NO ONE!";
            }

            this.isLoading = false;
          }, error => {
            this.alertService.error("There was a problem when trying to verify the round");
          }
        )
      }, error => {
        this.alertService.error("There was a problem when trying to get the round");
      }
    )
  }

  nextRound() {
    this.isLoading = true;
    this.roundService.getNextRound(this.round.gameId).subscribe(
      (r: Round) => {
        if (r == undefined || r == null) {
          this.router.navigate(["/gameover/" + this.round.gameId]);
        } else {
          this.router.navigate(["/play/" + r.id]);
        }
      }, error => {
        this.alertService.error("There was a problem when trying to get the next round");
      }
    )
  }

}
