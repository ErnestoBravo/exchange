import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetirarMainComponent } from './retirar-main/retirar-main.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: RetirarMainComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetirarRoutingModule { }
