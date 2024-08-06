import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories: any[] = [];

  slides = [
    { image: 'assets/image1.png', alt: 'Banner 1', title: 'Última Colección', buttonText: 'Comprar Ahora' },
    { image: 'assets/image2.png', alt: 'Banner 2', title: 'Nueva Temporada', buttonText: 'Descubrir' },
    { image: 'assets/image3.png', alt: 'Banner 3', title: 'Ofertas Exclusivas', buttonText: 'Ver Ofertas' },
    { image: 'assets/image4.png', alt: 'Banner 3', title: 'Ofertas Exclusivas2', buttonText: 'Ver Ofertas2' }
  ];

  tipos = [
    { tip_name: 'Uniformes Genericos'},
    { tip_name: 'Uniformes Escolares'}
  ]

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
    this.loadCategories();

  }


  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  currentSlide = 0;
  currentTranslate = 0;

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
    this.updateTranslate();
  }

  nextSlide() {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.updateTranslate();
  }

  updateTranslate() {
    console.log(this.currentSlide)
    this.currentTranslate = -this.currentSlide * 800;
  }

}
