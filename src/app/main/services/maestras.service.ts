import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MaestrasService {

  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getFundos(): Observable<any> {
    const url = `${this.baseUrl}/maestras/fundos`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo fundos');
    }
  }

  getCultivos(): Observable<any> {
    const url = `${this.baseUrl}/maestras/cultivos`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo cultivos');
    }
  }

  getGrupos(params: any): Observable<any> {
    console.log('params: ', params)
    const url = `${this.baseUrl}/maestras/grupos/${params.nrodocumento}`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo grupos');
    }
  }

  getTapas(): Observable<any> {
    const url = `${this.baseUrl}/maestras/tapas`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo tapas');
    }
  }

  getModulos(): Observable<any> {
    const url = `${this.baseUrl}/maestras/modulos`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo modulos');
    }
  }

  getLotes(): Observable<any> {
    const url = `${this.baseUrl}/maestras/lotes`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo lotes');
    }
  }

  getTurnos(): Observable<any> {
    const url = `${this.baseUrl}/maestras/turnos`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo turnos');
    }
  }

  getVariedades(): Observable<any> {
    const url = `${this.baseUrl}/maestras/variedades`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo variedades');
    }
  }

  getEnvases(): Observable<any> {
    const url = `${this.baseUrl}/maestras/envases`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo envases');
    }
  }

  getCosechadores(params: any): Observable<any> {
    const url = `${this.baseUrl}/maestras/cosechadores/${params.nrodocumento}`;
    try {
      return this.http.get<any>(url);
    } catch (error: any) {
      throw new Error(error.error?.message || 'Error obteniendo cosechadores');
    }
  }
}
