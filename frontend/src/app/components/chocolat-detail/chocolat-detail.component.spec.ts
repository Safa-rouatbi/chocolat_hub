import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatDetailComponent } from './chocolat-detail.component';

describe('ChocolatDetailComponent', () => {
  let component: ChocolatDetailComponent;
  let fixture: ComponentFixture<ChocolatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolatDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChocolatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
