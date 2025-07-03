import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;


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
    { tip_name: 'Uniformes Genericos' },
    { tip_name: 'Uniformes Escolares' }
  ]

  constructor(private apiService: AppService) {
    this.categories = [
      {
        "cat_id": 1,
        "cat_name": "PALMARES",
        "cat_description": "Colegio Palmares",
        "cat_state": true,
        "img": "/assets/img/PALMARES.jpeg"
      },
      {
        "cat_id": 2,
        "cat_name": "MELFORD",
        "cat_description": "Colegio Melford",
        "cat_state": true,
        "img": "/assets/img/MELFORD.jpeg"
      },
      {
        "cat_id": 4,
        "cat_name": "SANTA BARBARA",
        "cat_description": "Colegio Santa Barbara",
        "cat_state": true,
        "img": "/assets/img/SANTA_BARBARA.jpeg"
      },
      {
        "cat_id": 3,
        "cat_name": "SAN CARLOS",
        "cat_description": "Colegio San Carlos",
        "cat_state": true,
        "img": "/assets/img/SAN_CARLOS.jpeg"
      },
      {
        "cat_id": 5,
        "cat_name": "PAULA JARAQUEMADA",
        "cat_description": "Colegio Paula Jaraquemada",
        "cat_state": true,
        "img": "/assets/img/PAULA_JARAQUEMADA.jpeg"
      },
      {
        "cat_id": 6,
        "cat_name": "RAYITO DE LUZ",
        "cat_description": "Colegio Rayito de Luz",
        "cat_state": true,
        "img": "/assets/img/RAYITO.jpeg"
      },
      {
        "cat_id": 7,
        "cat_name": "SANTA MARIA",
        "cat_description": "Colegio Santa María",
        "cat_state": true,
        "img": "/assets/img/SANTA_MARIA.jpeg"
      }
    ]
  }

  ngOnInit(): void {
    // this.loadCategories();
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
