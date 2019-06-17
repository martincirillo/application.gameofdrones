import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StartupComponent } from './components/startup/startup.component';
import { PlayComponent } from './components/play/play.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundErrorPageComponent } from './components/not-found-errorpage/not-found-errorpage.component';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { SpinnerDirective } from './directives/spinner.directive';
import { DisplayWinnerComponent } from './components/display-winner/display-winner.component';
import { GameOverComponent } from './components/game-over/game-over.component';
import { GameStatisticsComponent } from './components/game-statistics/game-statistics.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    StartupComponent,
    PlayComponent,
    NotFoundErrorPageComponent,
    LayoutComponent,
    SpinnerDirective,
    DisplayWinnerComponent,
    GameOverComponent,
    GameStatisticsComponent,
    AlertComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
