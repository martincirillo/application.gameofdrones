import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../model/game';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getGameById(id: string) : Observable<Game> {
    return this.http.get<Game>(environment.apiUrl + "Games/" + id);
  }

  getWinner(id: string) : Observable<User> {
    return this.http.get<User>(environment.apiUrl + "Games/Winner/" + id);
  }

  addGame(game: Game): Observable<Game> {
    const body = JSON.stringify(game);
    return this.http.post<Game>(environment.apiUrl + 'Games/Save', body, { headers: this.headers });
  }

  finish(id: string): Observable<boolean> {
    const body = JSON.stringify(id);
    return this.http.put<boolean>(environment.apiUrl + 'Games/Finish', body, { headers: this.headers });
  }
}
