import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
// import { TableComponent } from './components/table/table.component';



export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'loadunit', loadChildren: () => import('./modules/loadunit/loadunit.module').then(m => m.LoadUnitModule)},
  { path: 'abonar', loadChildren: () => import('./modules/abonar/abonar.module').then(m => m.AbonarModule)},
  { path: 'compraVenta', loadChildren: () => import('./modules/compraVenta/compraVenta.module').then(m => m.CompraVentaModule)},
  { path: 'retirar', loadChildren: () => import('./modules/retirar/retirar.module').then(m => m.RetirarModule)},
  { 
    path: '**', 
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  initialPage: string;
  routerList = routes;

  constructor(private router: Router) {
    this.setInitialPage('');
  }

  public setInitialPage(init: string) {
    if (init !== '') {
      // set default page values
      if (typeof this.router.config !== 'undefined') {
        this.router.config.forEach((route) => {
          if (typeof route.redirectTo !== 'undefined') {
            route.redirectTo = init;
          }
        });
      }

      // redirect to initial page
      this.router.navigate([init]);
    }
  }
}
