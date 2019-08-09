import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VivierAddComponent } from './vivier-add.component';

describe('VivierAddComponent', () => {
  let component: VivierAddComponent;
  let fixture: ComponentFixture<VivierAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VivierAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VivierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
