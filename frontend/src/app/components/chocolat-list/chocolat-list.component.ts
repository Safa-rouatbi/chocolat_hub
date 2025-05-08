import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChocolatService } from '../../services/chocolat.service';
import { Chocolat } from '../../interfaces/chocolat.interface';

@Component({
  selector: 'app-chocolat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-chocolate-800">Liste des Chocolats</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (chocolat of chocolats; track chocolat._id) {
          <div class="bg-white rounded-lg shadow-md p-4">
            <h2 class="text-xl font-semibold mb-2 text-chocolate-800">{{ chocolat.nom }}</h2>
            <p class="text-chocolate-600">Type: {{ chocolat.type }}</p>
            <p class="text-chocolate-600">Origine: {{ chocolat.origine }}</p>
            <p class="text-chocolate-600">Prix: {{ chocolat.prix }}€</p>
            @if (chocolat.description) {
              <p class="text-chocolate-600 mt-2">{{ chocolat.description }}</p>
            }
            <div class="mt-4 flex gap-2">
              <button (click)="deleteChocolat(chocolat._id!)" 
                      class="bg-chocolate-400 text-white px-4 py-2 rounded-lg hover:bg-chocolate-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg">
                Supprimer
              </button>
              <a [routerLink]="['/chocolats', chocolat._id]" 
                 class="bg-chocolate-600 text-white px-4 py-2 rounded-lg hover:bg-chocolate-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
                Modifier
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </a>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class ChocolatListComponent implements OnInit {
  chocolats: Chocolat[] = [];

  constructor(private chocolatService: ChocolatService) {}

  ngOnInit(): void {
    this.loadChocolats();
  }

  loadChocolats(): void {
    this.chocolatService.getAllChocolats().subscribe({
      next: (data) => this.chocolats = data,
      error: (error) => console.error('Erreur lors du chargement des chocolats:', error)
    });
  }

  deleteChocolat(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce chocolat ?')) {
      this.chocolatService.deleteChocolat(id).subscribe({
        next: () => {
          this.chocolats = this.chocolats.filter(c => c._id !== id);
        },
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}
