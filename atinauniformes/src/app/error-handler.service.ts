
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router, } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    public router: Router,
  ) { }



  private errorSubject = new BehaviorSubject<string | null>(null);
  // private errorSubject = new BehaviorSubject<string | null>('Cargando...');

  // Observable para que los componentes se suscriban
  errorMessage$ = this.errorSubject.asObservable();


  // Método para emitir un nuevo mensaje de error
  setError = (message: string) => {
    this.errorSubject.next(message);
  }

  // Método para limpiar el mensaje de error
  clearError = () => {
    console.log('borrando')
    this.errorSubject.next(null);

  }




  handleError = (error: HttpErrorResponse): Observable<never> => {
    let errorMessage = '';
    // let errorNew = { ...error,
    //   errorMessage: '',
    //  }

    console.error(error.message)

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          // Desconexión del servidor o ERR_CONNECTION_REFUSED
          console.log('Servidor desconectado')
          errorMessage = 'No se pudo conectar al servidor. Por favor, verifica tu conexión.';
          this.setError(errorMessage)

          break;
        case 401:
          // Acceso denegado
          errorMessage = 'Tiempo expirado. Por favor, inicia sesión nuevamente.';
          this.logoutUser();
          break;
        case 403:
          // Acceso denegado
          errorMessage = 'Acceso denegado. Por favor, inicia sesión nuevamente.';
          this.logoutUser();
          break;
        case 404:
          // Recurso no encontrado
          errorMessage = 'El recurso solicitado no está disponible.';
          this.showUserNotification(errorMessage);
          break;
        case 500:
          // Error interno del servidor
          errorMessage = 'Hubo un problema en el servidor. Intenta más tarde.';
          this.showUserNotification(errorMessage);
          break;
        default:
          // Otros errores
          errorMessage = `Error desconocido: ${error.message}`;
          this.showUserNotification('Ocurrió un error inesperado. Intenta nuevamente.');
      }
    }

    return throwError(() => ({
      ...error,
      errorMessage,
    }));
  }

  private showUserNotification(message: string): void {
    // Aquí puedes implementar un servicio de notificaciones o un modal
    console.log(message); // Cambiar a un servicio más amigable para producción
  }

  private logoutUser(): void {
    // Limpia las variables de sesión y redirige al usuario
    sessionStorage.clear();
    localStorage.clear();
    // window.location.reload(); // Opcional: Redirige al login
  }



   // Método general para realizar una solicitud HTTP y limpiar errores automáticamente si la solicitud tiene éxito
  //  handleRequest<T>(observable: Observable<T>): Observable<T> {
  //   console.log('handleRequest')
  //   return observable.pipe(
  //     tap(() => {
  //       // Si la solicitud fue exitosa, limpiar el mensaje de error
  //       this.clearError();
  //     }),
  //     catchError((error) => this.handleError(error))
  //   );
  // }
}