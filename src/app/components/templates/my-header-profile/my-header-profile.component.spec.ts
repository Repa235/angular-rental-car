import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHeaderProfileComponent } from './my-header-profile.component';

describe('MyHeaderProfileComponent', () => {
  let component: MyHeaderProfileComponent;
  let fixture: ComponentFixture<MyHeaderProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyHeaderProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyHeaderProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
