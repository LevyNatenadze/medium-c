import {Injectable, inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment.development'
import {Observable, map} from 'rxjs'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthResponseInterface} from '../types/authResponse.interface'
import { LoginRequestInterface } from '../types/loginRequest.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  getUser(response: AuthResponseInterface): CurrentUserInterface {
    return response.user;
  }

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users';
    return this.httpClient
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  };

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    const url = environment.apiUrl + '/users/login';
    return this.httpClient
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser))
  }
  
}
