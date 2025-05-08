import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolatListComponent } from './chocolat-list.component';

describe('ChocolatListComponent', () => {
  let component: ChocolatListComponent;
  let fixture: ComponentFixture<ChocolatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolatListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChocolatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
