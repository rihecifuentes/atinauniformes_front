

import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-colegio',
  standalone: true,
  imports: [],
  templateUrl: './colegio.component.html',
  styleUrl: './colegio.component.css'
})
export class ColegioComponent {

  products: any[] = [];
  errorMessage: string = '';

  nombre_colegio = ''

  constructor(
    private apiService: AppService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const cat_id = this.route.snapshot.paramMap.get('cat_id');
    console.log(cat_id)
    this.apiService.getProductsByCategory(Number(cat_id)).subscribe(
      data => {
        this.products = data;

        this.nombre_colegio = this.products[0].cat_name
        // console.log(data)
      },
      error => {
        console.log(error)
        this.errorMessage = error;
      }
    );
  }

}
