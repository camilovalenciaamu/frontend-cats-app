import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class AuthGateway {
  abstract login(email: string, password: string): Observable<UserModel>;
  abstract register(user: UserModel): Observable<UserModel>;
}
