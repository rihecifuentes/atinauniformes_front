import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppService } from '../app.service';
// import { ActivatedRoute } from '@angular/router';
declare var bootstrap: any;

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

  message: string = ''

  add_bool: boolean = true
  bool_editAdd: boolean = false


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
        this.openModal()
        this.message = 'Data actualizada'
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
        this.openModal()
        this.message = 'Colegio borrado'
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

  addProductBtn(): void{

    this.product = { cat_id: null, prod_name: '', prod_description: '', prod_price: 0, prod_stock_quantity: 0, prod_image_url: '', prod_mdata: {} };

    this.bool_editAdd = true
    this.add_bool = true

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


  selectProduct(product: any): void {
    
    this.product = product
    this.bool_editAdd = true
    this.add_bool = false

  }



  updateProduct(): void {
    console.log(this.product)
    this.apiService.updateProduct(this.product).subscribe(
      data => {
        const index = this.products.findIndex(p => p.prod_id === data.prod_id);
        if (index !== -1) {
          this.products[index] = data;
        }
        this.openModal()
        this.message = 'Data actualizada'
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

  cancelProduct(): void {
    this.bool_editAdd = false
  }


  selectedFile: any = {}
  pathImage: string = ''
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (this.selectedFile) {
      this.apiService.uploadImage(this.selectedFile).subscribe(
        response => {
          console.log(response)

          this.pathImage = `http://localhost:3000/api/${response.filePathMini}`
          this.product.prod_image_url = `http://localhost:3000/api/${response.filePath}`
          // this.addProduct();
        },
        error => {
          this.errorMessage = error;
        }
      );
    } else {
      // this.addProduct();
    }
  }





  modal: any

  openModal() {
    const modalElement = document.getElementById('modalAdmin');
    this.modal = new bootstrap.Modal(modalElement);
    this.modal.show();
  }

  closeModal() {
    this.modal.hide()
  }



}
