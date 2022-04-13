import { CharCountDirective } from './char-count.directive';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from '@mova/lib-auth';
import { MOCK_AUTH_SERVICE } from '../../../core/mocks/generics.mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// #docregion test-component
@Component({
  template: `
    <div class="p-col-12 ux-ui-textarea-counter">
      <label>{{ 'OPINION.opinion' }}</label>
      <textarea class="p-mt-2" pInputTextarea rows="5" cols="30" maxlength="255"
                [ngModel]="observation"
                placeholder="{{'OPINION.observationOpinionResponse'}}"></textarea>
      <span class="textarea-counter" appCharCount [maxlength]="255" ngDefaultControl
            [ngModel]="observation"
            [ngModelOptions]="{standalone: true}"> </span>
    </div>
  `
})
class TestComponent {
  observation: any;
}

// #enddocregion test-component


describe('CharCountDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  // #docregion selected-tests
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [CharCountDirective, TestComponent],
      providers: [
        { provide: AuthService, useValue: MOCK_AUTH_SERVICE }
      ]
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(CharCountDirective));
  });
  it('should display none', () => {
    const dir = des[0].injector.get(CharCountDirective) as CharCountDirective;
    expect(dir.maxlength).toEqual(255);
  });
});

