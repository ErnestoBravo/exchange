import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberValidate]'
})
export class NumberValidateDirective {
  @Input() hasDecimals: boolean;
  @Input() formItem;
  @Input() customPattern;

  constructor(private el: ElementRef) { }

  @HostListener('ngModelChange', ['$event']) onNgModelChange(event) {
    if (this.el && this.el.nativeElement?.max) {
      const target = this.el.nativeElement;
      const value = parseFloat(target.value);
      const max = parseFloat(target.max);
      const name = target.getAttribute('formControlName');

      if (this.formItem) {
        const FORM_CONTROL = this.formItem.controls;

        if (!isNaN(value)) {
          if (value <= max) {
            target.setAttribute('oldValue', target.value);
          } else {
            const validValue = target.getAttribute('oldValue');
            FORM_CONTROL[name].setValue(validValue);
          }
        }
      }
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (!event) {
      return false;
    } else {
      let regExpString;

      if (this.hasDecimals) {
        let maxDecimals = 2;
        if (event.target?.max) {
          maxDecimals = event.target.max.split('.')[1]?.length;
        }

        regExpString = new RegExp('^\\d*[,.]?\\d{0,' + maxDecimals + '}$', 'g');
      } else {
        regExpString = new RegExp('^\\d*$', 'g');
      }
      const specialKeys = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

      if (typeof this.customPattern !== 'undefined' && this.customPattern !== null) {
        regExpString = new RegExp(this.customPattern);
      }

      // Allow Backspace, tab, end, and home keys
      if (specialKeys.indexOf(event.key) !== -1) {
        return;
      }

      const current: string = event.currentTarget.value;
      const position = current.length;
      const next: string = [current.slice(0, position), event.key === 'Decimal' ? '.' : event.key, current.slice(position)].join('');
      if (event.currentTarget.value.endsWith('-') && event.key === '-') {
        event.preventDefault();
      }
      if (next && !String(next).match(regExpString)) {
        event.preventDefault();
      }
    }
  }

}
