import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesPageComponent } from './packages-page.component';

describe('PackagePageComponent', () => {
  let component: PackagesPageComponent;
  let fixture: ComponentFixture<PackagesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
