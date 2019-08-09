import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteAddComponent } from './entite-add.component';

describe('EntiteAddComponent', () => {
  let component: EntiteAddComponent;
  let fixture: ComponentFixture<EntiteAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
