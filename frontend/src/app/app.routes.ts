import { Routes } from '@angular/router';
import { ChocolatListComponent } from './components/chocolat-list/chocolat-list.component';
import { ChocolatFormComponent } from './components/chocolat-form/chocolat-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chocolats', pathMatch: 'full' },
  { path: 'chocolats', component: ChocolatListComponent },
  { path: 'chocolats/new', component: ChocolatFormComponent },
  { path: 'chocolats/:id', component: ChocolatFormComponent }
];
