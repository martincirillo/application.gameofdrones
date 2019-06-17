import { Routes } from '@angular/router';
import { StartupComponent } from './components/startup/startup.component';
import { PlayComponent } from './components/play/play.component';
import { DisplayWinnerComponent } from './components/display-winner/display-winner.component';
import { GameOverComponent } from './components/game-over/game-over.component';

export const LAYOUT_CHILD_ROUTES: Routes = [
    { path: '', redirectTo: '/start', pathMatch: 'full' },
    { path: 'start', component: StartupComponent },
    { path: 'play/:roundId', component: PlayComponent },
    { path: 'gameover/:gameId', component: GameOverComponent },
    { path: 'winner/:roundId', component: DisplayWinnerComponent },
];