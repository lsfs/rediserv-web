import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeCrudComponent } from './unidade-crud.component';

describe('UnidadeCrudComponent', () => {
  let component: UnidadeCrudComponent;
  let fixture: ComponentFixture<UnidadeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
