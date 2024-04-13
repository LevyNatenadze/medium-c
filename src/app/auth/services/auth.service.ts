import {Injectable, inject} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from 'src/environments/environment.development'
import {Observable, map} from 'rxjs'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {AuthResponseInterface} from '../types/authResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private readonly apiUrl: string = environment.apiUrl;

  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.httpClient
      .post<AuthResponseInterface>(`${this.apiUrl}/users`, data)
      .pipe(map((response) => response.user))
  };

  
}
