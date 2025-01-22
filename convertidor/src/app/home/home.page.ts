import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,  
  imports: [CommonModule, IonicModule, FormsModule],  
})
export class HomePage {
  constructor(private router: Router) { }
  goToPage(path: string) {
    this.router.navigateByUrl(path);
  }

}
