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
              <h2 class="text-xl font-semibold text-chocolate-800">Nom</h2>
              <p class="text-chocolate-600">{{ chocolat.nom }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-chocolate-800">Type</h2>
              <p class="text-chocolate-600">{{ chocolat.type }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-chocolate-800">Origine</h2>
              <p class="text-chocolate-600">{{ chocolat.origine }}</p>
            </div>
            
            <div>
              <h2 class="text-xl font-semibold text-chocolate-800">Prix</h2>
              <p class="text-chocolate-600">{{ chocolat.prix }}€</p>
            </div>
            
            @if (chocolat.description) {
              <div>
                <h2 class="text-xl font-semibold text-chocolate-800">Description</h2>
                <p class="text-chocolate-600">{{ chocolat.description }}</p>
              </div>
            }
          </div>
        }
        
        <div class="mt-8 flex gap-4">
          <button (click)="goBack()" 
                  class="bg-chocolate-400 text-white px-6 py-2 rounded-lg hover:bg-chocolate-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour
          </button>
          <button (click)="editChocolat()" 
                  class="bg-chocolate-600 text-white px-6 py-2 rounded-lg hover:bg-chocolate-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
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
