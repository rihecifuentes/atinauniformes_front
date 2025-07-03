import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private baseUrl = 'http://localhost:3000/api'; // Cambia esto a la URL de tu backend

  constructor(private http: HttpClient) { }

  // Categorías
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, category, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories`, category, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(cat_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${cat_id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Productos
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products`, product, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(prod_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${prod_id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  getProductsByCategory(cat_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${cat_id}`).pipe(
      catchError(this.handleError)
    );
  }

  getProductDetails(prod_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${prod_id}`).pipe(
      catchError(this.handleError)
    );
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search`, { params: { query } }).pipe(
      catchError(this.handleError)
    );
  }

  // Información del Sitio
  getContactInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contact-info`).pipe(
      catchError(this.handleError)
    );
  }

  getAboutInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/about`).pipe(
      catchError(this.handleError)
    );
  }

  getFAQ(): Observable<any> {
    return this.http.get(`${this.baseUrl}/faq`).pipe(
      catchError(this.handleError)
    );
  }




  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
      catchError(this.handleError)
    );
  }
  

  // Helper function to get the authentication headers
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token'); // Asegúrate de almacenar el token de autenticación en localStorage
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
