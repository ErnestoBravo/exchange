import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharCountDirective } from './char-count.directive';


@NgModule({
  declarations: [
    CharCountDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CharCountDirective
  ]
})
export class CharCountModule {
}
