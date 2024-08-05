import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppService } from '../app.service';
// import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  categories: any[] = [];
  category: any = { cat_name: '', cat_description: '' };

  
  products: any[] = [];
  product: any = { cat_id: null, prod_name: '', prod_description: '', prod_price: 0, prod_stock_quantity: 0, prod_image_url: '', prod_mdata: {} };

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

  addCategory(): void {
    this.apiService.addCategory(this.category).subscribe(
      data => {
        this.categories.push(data);
        this.category = { cat_name: '', cat_description: '' };
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  updateCategory(category: any): void {
    this.apiService.updateCategory(category).subscribe(
      data => {
        const index = this.categories.findIndex(c => c.cat_id === data.cat_id);
        if (index !== -1) {
          this.categories[index] = data;
        }
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  deleteCategory(cat_id: number): void {
    this.apiService.deleteCategory(cat_id).subscribe(
      () => {
        this.categories = this.categories.filter(category => category.cat_id !== cat_id);
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


  addProduct(): void {
    this.apiService.addProduct(this.product).subscribe(
      data => {
        this.products.push(data);
        this.product = { cat_id: null, prod_name: '', prod_description: '', prod_price: 0, prod_stock_quantity: 0, prod_image_url: '', prod_mdata: {} };
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  updateProduct(product: any): void {
    this.apiService.updateProduct(product).subscribe(
      data => {
        const index = this.products.findIndex(p => p.prod_id === data.prod_id);
        if (index !== -1) {
          this.products[index] = data;
        }
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  deleteProduct(prod_id: number): void {
    this.apiService.deleteProduct(prod_id).subscribe(
      () => {
        this.products = this.products.filter(product => product.prod_id !== prod_id);
      },
      error => {
        this.errorMessage = error;
      }
    );
  }









}
