
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ColegioComponent } from './pages/colegio/colegio.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'categories', component: CategoriesComponent },   //listado de categorias
  { path: 'c/:cat_id', component: ColegioComponent },   //productos de un colegio
  // { path: 'categories/:cat_id/products', component: ProductListComponent },
  // { path: 'products/:prod_id', component: ProductDetailComponent },
  // { path: 'search', component: SearchComponent },
  { path: 'admin', component: AdminComponent, data: { titulo: 'Administracion' } },
  // { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Perfil usuario' }, canActivate: [AuthGuard] } },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}