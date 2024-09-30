import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(usuario: string, clave: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { dni: usuario, clave };
  
    try {
      return this.http.post<any>(url, body);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error de autenticación');
    }
  }
}
