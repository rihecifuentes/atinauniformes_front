import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: any[] = [];
  errorMessage: string = '';

  constructor(
    private apiService: AppService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const cat_id = this.route.snapshot.paramMap.get('cat_id');
    this.apiService.getProductsByCategory(Number(cat_id)).subscribe(
      data => {
        this.products = data;
        console.log(data)
      },
      error => {
        console.log(error)
        this.errorMessage = error;
      }
    );
  }

}
