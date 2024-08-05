import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

}
