import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDialogComponent } from './modal-dialog.component';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MOCK_DIALOG_CONFIG } from 'src/app/core/mocks/generics.mock';

describe('ModalDialogComponent', () => {
  let component: ModalDialogComponent;
  let fixture: ComponentFixture<ModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDialogComponent ],
      providers: [
        {
          provide: DynamicDialogRef,
          // useValue: MOCK_DIALOG_REF
        },
        {
          provide: DynamicDialogConfig,
          useValue: MOCK_DIALOG_CONFIG
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call closeDialog method', () => {
    component.closeDialog();
  });

});
