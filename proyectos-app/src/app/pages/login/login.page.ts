import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent]
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';

  isLogged = false;
  cont = 0;
  isBlocked = false;

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {}

  async iniciarSesion() {

    if (this.isBlocked){
      this.toast('Cuenta bloqueada por demasiados intentos fallidos, intentelo mas tarde.', 2000, 'danger');
      return
    }
    await this.authService.login(this.usuario, this.password).then(
      (res) => {
        if (!res){
          console.log(res);
          this.cont++;
          this.toast('Usuario o contraseña incorrectos (Intento fallido ' + this.cont + ")", 2000, 'danger');
          if (this.cont == 3){
            this.toast('Demasiados intentos fallidos', 2000, 'danger');
            this.cont = 0;
            this.isBlocked = true;
          }
        } else {
          localStorage.setItem('sesionActiva', 'true');
          this.router.navigate(['/proyectos']);
        }
      }
    ).finally(() => {
    });





  }

  toast(message: string, duration: number, color: string) {
    const toast = this.toastController.create({
      message: message,
      duration: duration,
      color: color,
    });
    toast.then(t => t.present());
  }

  ngOnInit() {
  }

}
