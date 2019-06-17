import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Round } from '../model/round';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getRoundById(id: string): Observable<Round> {
    return this.http.get<Round>(environment.apiUrl + "Rounds/" + id);
  }

  getNextRound(gameId: string): Observable<Round> {
    return this.http.get<Round>(environment.apiUrl + "Rounds/Next/" + gameId);
  }

  verifyRound(round: Round): Observable<User> {
    const body = JSON.stringify(round);
    return this.http.put<User>(environment.apiUrl + 'Rounds/VerifyRound', body, { headers: this.headers });
  }

  addRound(round: Round): Observable<Round> {
    const body = JSON.stringify(round);
    return this.http.post<Round>(environment.apiUrl + 'Rounds/Save', body, { headers: this.headers });
  }
}
