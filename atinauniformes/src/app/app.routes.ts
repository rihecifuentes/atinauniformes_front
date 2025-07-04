
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ColegioComponent } from './pages/colegio/colegio.component';
import { CarritoCompraComponent } from './pages/carrito-compra/carrito-compra.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'c/:cat_id', component: ColegioComponent },   //productos de un colegio
  { path: 'carrito', component: CarritoCompraComponent },   //productos de un colegio
  { path: 'products/:prod_id', component: ProductDetailComponent },
  { path: 'admin', component: AdminComponent, data: { titulo: 'Administracion' } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}