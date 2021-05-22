import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cargo } from '../models/cargo.model';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly api = `${environment.api_url}/cargos`

  constructor(private http:HttpClient) { }


  public listar(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.api}/listar`);
  }

  


}
