import { Component,   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule ,RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  constructor(
    // private _SERVICES: AppService,
    public router: Router,
  ){}

  ngOnInit(): void {
    // if(localStorage['use_name']){
    //   this.use_name = localStorage['use_name']
    // }
    // else{
    //   this.use_name = ''
    // }

   
  }





}
