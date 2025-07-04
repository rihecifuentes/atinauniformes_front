import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  product: any;
  errorMessage: string = '';
  logo_colegio: string = '';

  constructor(private apiService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const prod_id = this.route.snapshot.paramMap.get('prod_id');
    this.apiService.getProductDetails(Number(prod_id)).subscribe(
      data => {
        console.log(data)
        this.product = data;
        this.logo_colegio = `/assets/img/${this.product.logo_colegio}`;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}

