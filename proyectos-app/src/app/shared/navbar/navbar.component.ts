import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class NavbarComponent  implements OnInit {
  @Input() title: string = 'Mi App';

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  cerrarSesion() {
    this.authService.logout();
  }

}
