import { Component } from '@angular/core';
import { AppService } from '../app.service';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categories: any[] = [];
  products: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}
