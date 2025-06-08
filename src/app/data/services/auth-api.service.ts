import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../../core/models/user.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/users/login`, {
      email,
      password,
    });
  }

  register(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/users/register`, user);
  }
}
