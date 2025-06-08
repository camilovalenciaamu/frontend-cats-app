import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { StorageService } from '../../data/services/storage.service';
import { AuthApiService } from '../../data/services/auth-api.service';

@Injectable({ providedIn: 'root' })
export class AuthUseCase {
  private currentUserSubject: BehaviorSubject<UserModel | null>;

  constructor(
    private authService: AuthApiService,
    private storage: StorageService
  ) {
    const storedUser = this.storage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<UserModel | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
  }

  login(email: string, password: string): Observable<UserModel> {
    return new Observable((observer) => {
      this.authService.login(email, password).subscribe({
        next: (user: UserModel) => {
          this.currentUserSubject.next(user);
          this.storage.setItem('currentUser', JSON.stringify(user));
          observer.next(user);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  register(user: UserModel): Observable<UserModel> {
    return this.authService.register(user);
  }

  getCurrentUser(): Observable<UserModel | null> {
    return this.currentUserSubject.asObservable();
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.storage.removeItem('currentUser');
  }
}
