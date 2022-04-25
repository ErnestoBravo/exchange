import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbonarMainComponent } from './abonar-main/abonar-main.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: AbonarMainComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbonarRoutingModule { }
