import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { ErrorHandlerService } from './error-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'atinauniformes';
  errorMessage: string | null = null;

   constructor(
    private _ERROR: ErrorHandlerService,
  ) {}

  ngOnInit(): void {

    // Suscribirse al mensaje de error
    this._ERROR.errorMessage$.subscribe(message => {
      this.errorMessage = message;
    });

  }
}
