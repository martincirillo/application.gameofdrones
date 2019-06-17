import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + "Users/" + id);
  }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + "Users?name=" + name);
  }

  addUser(user: User): Observable<User> {
    const body = JSON.stringify(user);
    return this.http.post<User>(environment.apiUrl + 'Users/Save', body, { headers: this.headers });
  }
}
