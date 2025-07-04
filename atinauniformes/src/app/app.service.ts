import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  private baseUrl = 'http://localhost:3000/api'; // Cambia esto a la URL de tu backend

  constructor(
    private http: HttpClient,
    private _ERROR: ErrorHandlerService,
  ) { }

  // Categorías
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, category, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories`, category, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  deleteCategory(cat_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${cat_id}`, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  // Productos
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products`, product, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  deleteProduct(prod_id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${prod_id}`, this.getAuthHeaders()).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  getProductsByCategory(cat_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${cat_id}`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  getProductDetails(prod_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/${prod_id}`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/products/search`, { params: { query } }).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  // Información del Sitio
  getContactInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/contact-info`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  getAboutInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/about`).pipe(
      catchError(this._ERROR.handleError)
    );
  }

  getFAQ(): Observable<any> {
    return this.http.get(`${this.baseUrl}/faq`).pipe(
      catchError(this._ERROR.handleError)
    );
  }




  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post(`${this.baseUrl}/upload`, formData).pipe(
      catchError(this._ERROR.handleError)
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
  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'An unknown error occurred!';
  //   if (error.status === 0) {
  //     // Un error del lado del cliente o de red ha ocurrido.
  //     // El 'status' es 0 para errores como net::ERR_CONNECTION_REFUSED.
  //     console.error('Ha ocurrido un error de red:', error.error);
  //     alert('No se pudo conectar con el servidor.')
  //     return throwError(() => new Error('No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.'));
  //   }
  //   if (error.error instanceof ErrorEvent) {
  //     // Error del lado del cliente
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // Error del lado del servidor
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => new Error('Algo malo ha sucedido; por favor, inténtalo de nuevo más tarde.'));
  // }


}
