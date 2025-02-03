import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost/proyectos-api/public';

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}


  getProyectosById(id: number): Observable<any[]> {
    const body = { "usuario_id": id.toString()};
    return this.http.post<any[]>(`${this.apiUrl}/proyectos/usuario`, body, { headers: this.headers });
  }

  getProyectoById(id: number): Observable<any[]> {
    const body = { "id": id.toString()};
    return this.http.post<any[]>(`${this.apiUrl}/proyectos/id`, body, { headers: this.headers });
  }

  createProyecto(Proyecto: Proyecto): Observable<any> {
    return this.http.post<Proyecto>(this.apiUrl + "/proyectos", Proyecto, {headers: this.headers});
  }

  updateProyecto(Proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${this.apiUrl}/proyectos/actualizar`, Proyecto);
  }

  createTarea(id_proyecto: number, titulo: string, descripcion: string): Observable<any> {
    const body = {
      "proyecto_id": id_proyecto,
      "titulo": titulo,
      "descripcion": descripcion,
      "estado": 0,
    };
    return this.http.post<any>(`${this.apiUrl}/tareas`, body, { headers: this.headers });
  }

  getTareas(id_proyecto: number): Observable<any[]> {
    const body = {
      "proyecto_id": id_proyecto
    };
    return this.http.post<any[]>(`${this.apiUrl}/tareas/proyecto`, body, { headers: this.headers });
  }

  updateTarea(id: number, titulo: string, descripcion: string, estado: number): Observable<Proyecto> {
    const body = {
      "id": id,
      "titulo": titulo,
      "descripcion": descripcion,
      "estado": estado,
    };
    return this.http.put<any>(`${this.apiUrl}/tareas/actualizar`, body, { headers: this.headers });
  }

  getTareaById(id: number): Observable<any[]> {
    const body = { "id": id.toString()};
    return this.http.post<any[]>(`${this.apiUrl}/tareas/id`, body, { headers: this.headers });
  }

  deleteTarea(id: number): Observable<any> {
    const body = { "id": id.toString()};
    return this.http.post<any>(`${this.apiUrl}/tareas/eliminar`, body, { headers: this.headers });
  }

  deleteProyecto(id: number): Observable<any> {
    const body = { "id": id.toString()};
    return this.http.post<any>(`${this.apiUrl}/proyectos/eliminar`, body, { headers: this.headers });
  }
}
