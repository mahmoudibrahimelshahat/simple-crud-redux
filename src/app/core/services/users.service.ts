import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../store/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<user[]> {
    return this.http.get<user[]>(`${this.apiUrl}/users`);
  }

  addUser(user: user): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`,user);
  }

  editUser(user: user,userId:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`,user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

}
