import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Area } from "../models/area.model";
import { Cargo } from "../models/cargo.model";


@Injectable({
    providedIn: 'root'
})
export class AreaService{

    private readonly api = `${environment.api_url}/areas`;

    constructor(private http:HttpClient){

    }


    public listar(): Observable<Area[]>{
       return this.http.get<Area[]>(`${this.api}/listar`);
    }

    
    public listarCargos(idArea: number): Observable<Cargo[]>{
        return this.http.get<Cargo[]>(`${this.api}/${idArea}/cargos`);
      }






}