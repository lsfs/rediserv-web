import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private readonly api = `${environment.api_url}/estados`

  constructor(private http:HttpClient) { }

  public listar(): Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.api}/listar`);
  }

}
