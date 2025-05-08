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
      <h1 class="text-3xl font-bold mb-6">Liste des Chocolats</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @for (chocolat of chocolats; track chocolat._id) {
          <div class="bg-white rounded-lg shadow-md p-4">
            <h2 class="text-xl font-semibold mb-2">{{ chocolat.nom }}</h2>
            <p class="text-gray-600">Type: {{ chocolat.type }}</p>
            <p class="text-gray-600">Origine: {{ chocolat.origine }}</p>
            <p class="text-gray-600">Prix: {{ chocolat.prix }}€</p>
            @if (chocolat.description) {
              <p class="text-gray-600 mt-2">{{ chocolat.description }}</p>
            }
            <div class="mt-4 flex gap-2">
              <button (click)="deleteChocolat(chocolat._id!)" 
                      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Supprimer
              </button>
              <a [routerLink]="['/chocolats', chocolat._id]" 
                 class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Modifier
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
