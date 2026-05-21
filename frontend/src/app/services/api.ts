import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';


  getMarcas(page: number = 0, size: number = 6): Observable<any> {
    return this.http.get(`${this.apiUrl}/marcas?page=${page}&size=${size}`);
  }


  getPerfumesDeMarca(urlRelacion: string): Observable<any> {
    return this.http.get(urlRelacion);
  }

  crearPerfume(perfume: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/perfumes`, perfume);
  }

  crearMarca(marca: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/marcas`, marca);
  }


  borrarPerfume(urlPerfume: string): Observable<any> {
    return this.http.delete(urlPerfume);
  }


  editarPerfume(urlPerfume: string, perfumeModificado: any): Observable<any> {
    return this.http.put(urlPerfume, perfumeModificado);
  }


  borrarMarca(urlMarca: string): Observable<any> {
    return this.http.delete(urlMarca);
  }

}
