import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-chocolate-50">
      <nav class="bg-chocolate-800 text-white shadow-lg">
        <div class="container mx-auto px-4 py-3">
          <div class="flex justify-between items-center">
            <a routerLink="/" class="text-2xl font-bold text-chocolate-100 hover:text-chocolate-50 transition-all duration-300 ease-in-out transform hover:scale-105 no-underline">
              Chocolat Hub
            </a>
            <div class="space-x-6">
              <a routerLink="/chocolats" class="text-white no-underline hover:text-chocolate-200 transition-all duration-300 ease-in-out transform hover:scale-105 px-4 py-2 rounded-lg hover:bg-chocolate-700">
                Liste
              </a>
              <a routerLink="/chocolats/new" class="text-white no-underline hover:text-chocolate-200 transition-all duration-300 ease-in-out transform hover:scale-105 px-4 py-2 rounded-lg hover:bg-chocolate-700">
                Ajouter
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'chocolat-hub';
}
