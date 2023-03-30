import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAccessComponent } from './hotel-access.component';

describe('HotelAccessComponent', () => {
  let component: HotelAccessComponent;
  let fixture: ComponentFixture<HotelAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
