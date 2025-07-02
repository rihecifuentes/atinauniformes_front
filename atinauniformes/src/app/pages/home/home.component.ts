import { Component } from '@angular/core';
import { AppService } from '../../app.service';
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
        let n = 1
        for (let colegio of this.categories) {
          colegio.img = `/assets/img/image${n}.png`
          n++
        }
      },
      error => {
        console.log(error);
      }
    );
  }



}
