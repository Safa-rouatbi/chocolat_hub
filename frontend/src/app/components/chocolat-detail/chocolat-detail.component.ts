import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChocolatService } from '../../services/chocolat.service';
import { Chocolat } from '../../interfaces/chocolat.interface';

@Component({
  selector: 'app-chocolat-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 class="text-3xl font-bold mb-6">Détails du Chocolat</h1>
        
        @if (chocolat) {
          <div class="space-y-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-700">Nom</h2>
              <p class="text-gray-600">{{ chocolat.nom }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-gray-700">Type</h2>
              <p class="text-gray-600">{{ chocolat.type }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-gray-700">Origine</h2>
              <p class="text-gray-600">{{ chocolat.origine }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-gray-700">Prix</h2>
              <p class="text-gray-600">{{ chocolat.prix }}€</p>
            </div>
            
            @if (chocolat.description) {
              <div>
                <h2 class="text-xl font-semibold text-gray-700">Description</h2>
                <p class="text-gray-600">{{ chocolat.description }}</p>
              </div>
            }
          </div>
        }
        
        <div class="mt-8 flex gap-4">
          <button (click)="goBack()" 
                  class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">
            Retour
          </button>
          <button (click)="editChocolat()" 
                  class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Modifier
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChocolatDetailComponent implements OnInit {
  chocolat: Chocolat | null = null;

  constructor(
    private chocolatService: ChocolatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadChocolat(id);
    }
  }

  loadChocolat(id: string): void {
    this.chocolatService.getAllChocolats().subscribe({
      next: (chocolats) => {
        const chocolat = chocolats.find(c => c._id === id);
        if (chocolat) {
          this.chocolat = chocolat;
        }
      },
      error: (error) => console.error('Erreur lors du chargement du chocolat:', error)
    });
  }

  goBack(): void {
    this.router.navigate(['/chocolats']);
  }

  editChocolat(): void {
    if (this.chocolat?._id) {
      this.router.navigate(['/chocolats', this.chocolat._id]);
    }
  }
}
