import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '@mova/lib-auth';
import { MOCK_AUTH_SERVICE } from '../../../core/mocks/generics.mock';
import { By } from '@angular/platform-browser';
import { NumberValidateDirective } from './number-validate.directive';

@Component({
  template: `
    <div class="p-col-12 ux-ui-textarea-counter">
      <label>{{ 'OPINION.opinion' }}</label>
      <input id="testControl" min="0" max="99.99" formControlName="testControl" [appNumberValidate]="true" [formItem]="testForm" class="ux-ui-inputtext" type="number" pInputText />
      <input id="testEntireControl" min="0" max="9999" formControlName="testEntireControl" [appNumberValidate]="false" [formItem]="testForm" class="ux-ui-inputtext" type="number" pInputText />
    </div>
  `
})
class TestComponent { }

describe('NumberValidateDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let directive;
  const FORM_BUILDER: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberValidateDirective, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.directive(NumberValidateDirective));
    directive = new NumberValidateDirective(inputEl);
    directive.formItem = FORM_BUILDER.group({
      testControl: [null, Validators.max(99.99)],
      testEntireControl: [null, Validators.max(9999)]
    });
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should ngModelChange', () => {
    inputEl.nativeElement.value = 15;
    directive.formItem.controls.testControl.setValue(99.99);
    inputEl.triggerEventHandler('ngModelChange', 2);
    fixture.detectChanges();
  });

  it('should keydown with entire', () => {
    const event = new KeyboardEvent('keydown', { key: '9' });
    inputEl.nativeElement.dispatchEvent(event);
    directive.appNumberValidate = false;
    fixture.detectChanges();
  });

  it('should keydown with number', () => {
    const event = new KeyboardEvent('keydown', { key: '9' });
    inputEl.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
  });

  it('should keydown with string', () => {
    const event = new KeyboardEvent('keydown', { key: '-' });
    inputEl.nativeElement.dispatchEvent(event);
    fixture.detectChanges();
  });




});
