import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AvancesService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  enviarAvance(params: any): Observable<any> {
    const url = `${this.baseUrl}/avance`;
    const body = { id: "1", jsonData: params}
    console.log(body)
    try {
      return this.http.post<any>(url, body);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error al enviar avances');
    }
  }
}
