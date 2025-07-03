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

  constructor(private apiService: AppService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const prod_id = this.route.snapshot.paramMap.get('prod_id');
    this.apiService.getProductDetails(Number(prod_id)).subscribe(
      data => {
        this.product = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}

