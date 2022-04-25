import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompraVentaMainComponent } from './compraVenta-main/compraVenta-main.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: CompraVentaMainComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompraVentaRoutingModule { }
