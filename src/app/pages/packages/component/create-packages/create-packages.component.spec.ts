import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackagesComponent } from './create-packages.component';

describe('CreatePackagesComponent', () => {
  let component: CreatePackagesComponent;
  let fixture: ComponentFixture<CreatePackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
