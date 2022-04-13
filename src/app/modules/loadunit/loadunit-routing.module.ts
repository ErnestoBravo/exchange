import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateModifyLoadUnitComponent } from './create-modify-loadunit/create-modify-loadunit.component';
import { ViewLoadUnitComponent } from './view-loadunit/view-loadunit.component';
import { LoadUnitMaintainerComponent } from './loadunit-maintainer/loadunit-maintainer.component';


const routes: Routes = [{
  path: '', children: [
    { path: '', component: LoadUnitMaintainerComponent },
    { path: 'create', component: CreateModifyLoadUnitComponent},
    { path: 'view', component: ViewLoadUnitComponent},
    { path: 'modify/:id', component: CreateModifyLoadUnitComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
