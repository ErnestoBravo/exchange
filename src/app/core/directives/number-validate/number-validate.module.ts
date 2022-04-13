import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberValidateDirective } from './number-validate.directive';


@NgModule({
  declarations: [
    NumberValidateDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberValidateDirective
  ]
})
export class NumberValidateModule {
}
