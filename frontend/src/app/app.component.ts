import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/" class="text-2xl font-bold">Chocolat Hub</a>
        <div class="space-x-4">
          <a routerLink="/chocolats" class="hover:text-gray-300">Liste des Chocolats</a>
          <a routerLink="/chocolats/new" class="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Ajouter un Chocolat
          </a>
        </div>
      </div>
    </nav>

    <main class="min-h-screen bg-gray-100">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'Chocolat Hub';
}
