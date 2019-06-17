import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Round } from 'src/app/model/round';
import { User } from 'src/app/model/user';
import { RoundService } from 'src/app/services/round.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  private round: Round;
  private user1: User;
  private user2: User;

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
        this.user1 = r.game.user1;
        this.user2 = r.game.user2;
        this.isLoading = false;
      }, error => {
        this.alertService.error("There was a problem when trying to get the current round");
      }
    );
  }

  changeOption(userId: string, option: number) {
    if (userId == this.user1.id) {
      this.round.user1Choise = option;
    } else {
      this.round.user2Choise = option;
    }
  }

  verifyResult() {
    if (this.round.user1Choise == undefined || this.round.user1Choise == null || this.round.user2Choise == undefined || this.round.user2Choise == null) {
      this.alertService.error("Players must select their choise")
    } else {
      this.isLoading = true;
      this.roundService.verifyRound(this.round).subscribe(
        (u: User) => {
          this.router.navigate(["/winner/" + this.round.id]);
        }, error => {
          this.alertService.error("There was a problem when trying to validate the round");
        }
      );
    }
  }
}
