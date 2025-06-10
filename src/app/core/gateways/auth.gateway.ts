import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

export interface AuthGateway {
  login(email: string, password: string): Observable<UserModel>;
  register(user: UserModel): Observable<UserModel>;
}
