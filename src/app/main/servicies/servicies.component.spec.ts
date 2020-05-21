import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciesComponent } from './servicies.component';

describe('ServiciesComponent', () => {
  let component: ServiciesComponent;
  let fixture: ComponentFixture<ServiciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
