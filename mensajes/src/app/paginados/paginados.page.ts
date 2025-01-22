import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-paginados',
  templateUrl: './paginados.page.html',
  styleUrls: ['./paginados.page.scss'],
  standalone: false
})
export class PaginadosPage implements OnInit {

  constructor(private router: Router, private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  volver(){
    this.router.navigate(['/home'])
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}