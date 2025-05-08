import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatFormComponent } from './chocolat-form.component';

describe('ChocolatFormComponent', () => {
  let component: ChocolatFormComponent;
  let fixture: ComponentFixture<ChocolatFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolatFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChocolatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
