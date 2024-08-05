import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  products: any[] = [];
  errorMessage: string = '';
  query: string = '';

  constructor(
    private apiService: AppService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.searchProducts();
    });
  }

  searchProducts(): void {
    this.apiService.searchProducts(this.query).subscribe(
      data => {
        this.products = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}
