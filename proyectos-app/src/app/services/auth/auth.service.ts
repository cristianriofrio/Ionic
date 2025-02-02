import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/proyectos-api/public'; // Cambia esto por tu URL de API

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private readonly USUARIO_VALIDO = { usuario: 'admin', password: '1234' };

  constructor(private router: Router, private toastController: ToastController, private http: HttpClient) {}

  async login(usuario: string, password: string): Promise<boolean> {
    const body = { correo: usuario, contrasena: password };

    try {
      const data = await lastValueFrom(this.http.post<any>(`${this.apiUrl}/login`, body, { headers: this.headers })).then()
      localStorage.setItem('user_id', data.user.id);
      return true;  // Ahora devuelve true correctamente
    } catch (error) {
      console.error('Error en el login:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('sesionActiva');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('sesionActiva') === 'true';
  }
}
