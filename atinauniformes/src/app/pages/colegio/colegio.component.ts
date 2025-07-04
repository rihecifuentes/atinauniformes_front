

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
  logo_colegio = '';

  constructor(
    private apiService: AppService,
    private route: ActivatedRoute
  ) {
    let products1 = [
      {
        "prod_id": 3,
        "cat_id": 2,
        "prod_name": "Pantalón Buzo Hb, Tallas 1 a 10 años",
        "prod_description": "fder",
        "prod_price": "15000",
        "prod_stock_quantity": 10,
        "prod_image_url": "http://localhost:3000/api/uploads/1722913139068.jpg",
        "cat_name": "MELFORD",
        "image_url": "/assets/img/buzo1.png"
      },
      {
        "prod_id": 2,
        "cat_id": 2,
        "prod_name": "Calza Hb, Tallas 4 a 10",
        "prod_description": "descripcion",
        "prod_price": "9500",
        "prod_stock_quantity": 10,
        "prod_image_url": "http://localhost:3000/api/uploads/1722913044658.jpg",
        "cat_name": "MELFORD",
        "image_url": "/assets/img/buzo1.png"
      },
      {
        "prod_id": 1,
        "cat_id": 2,
        "prod_name": "Polera",
        "prod_description": "Polera piqdf",
        "prod_price": "5000",
        "prod_stock_quantity": 20,
        "prod_image_url": "http://localhost:3000/api/uploads/1722912636843.webp",
        "cat_name": "MELFORD",
        "image_url": "/assets/img/buzo1.png"
      }
    ]

    // let nombre_colegio1 = this.products[0].cat_name
  }

  imagenes = ['buzo1.png', 'buzo2.png', 'falda1.png', 'polar1.png', 'polera1.png']



  ngOnInit(): void {
    const cat_id = this.route.snapshot.paramMap.get('cat_id');
    this.loadProducts(cat_id)
  }


  loadProducts(cat_id: any): void {

    this.apiService.getProductsByCategory(Number(cat_id)).subscribe(
      data => {
        console.log(data)
        this.products = data;
        this.nombre_colegio = this.products[0].cat_name;
        this.logo_colegio = `/assets/img/${this.products[0].logo_colegio}`;



        for (const product of this.products) {
          product.image_url = `/assets/img/${this.imagenes[0]}`;
          product.precio = Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.precios[0].pri_precio);
          

        }
      },
      error => {
        console.log(error)
        this.errorMessage = error;
      }
    );
  }





}
