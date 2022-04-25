import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AbonarComponent } from './abonar/abonar.component';
import { CompraVentaComponent } from './compraVenta/compraVenta.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: MainComponent },
    { path: 'abonar', component: AbonarComponent},
    { path: 'compraVenta', component: CompraVentaComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
