import { Component } from '@angular/core';
import { ChocolatListComponent } from './components/chocolat-list/chocolat-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChocolatListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
