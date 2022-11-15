import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFatherComponent } from './form-father.component';

describe('FormFatherComponent', () => {
  let component: FormFatherComponent;
  let fixture: ComponentFixture<FormFatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
