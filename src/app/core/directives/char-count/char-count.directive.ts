import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[appCharCount]',
  // providers: [NgModel]
})
export class CharCountDirective implements OnInit {

  // @Input() control?: FormControl | ControlValueAccessor;
  @Input() maxlength: number;

  constructor(
    private elementRef: ElementRef,
    private ngModel: NgModel
  ) {
  }

  ngOnInit() {
    this.resetCharCount();
    this.ngModel.control.valueChanges.subscribe((data) => {
      if (data) {
        this.elementRef.nativeElement.innerHTML = `${data.length}/${this.maxlength}`;
      } else {
        this.resetCharCount();
      }
    });
    // this.control.valueChanges.subscribe((data) => {
    //   this.elementRef.nativeElement.innerHTML = `${data.length}/${this.maxlength}`;
    // });
  }

  resetCharCount() {
    this.elementRef.nativeElement.innerHTML = `0/${this.maxlength}`;
  }
}
