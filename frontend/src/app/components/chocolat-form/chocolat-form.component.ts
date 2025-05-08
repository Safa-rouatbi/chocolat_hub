import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChocolatService } from '../../services/chocolat.service';
import { Chocolat } from '../../interfaces/chocolat.interface';

@Component({
  selector: 'app-chocolat-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6 text-chocolate-800">{{ isEditMode ? 'Modifier' : 'Ajouter' }} un Chocolat</h1>
      
      <form (ngSubmit)="onSubmit()" class="max-w-lg mx-auto">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="nom">Nom</label>
          <input type="text" id="nom" [(ngModel)]="chocolat.nom" name="nom" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="type">Type</label>
          <select id="type" [(ngModel)]="chocolat.type" name="type" required
                  class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500">
            <option value="">Sélectionnez un type</option>
            <option value="Noir">Noir</option>
            <option value="Lait">Lait</option>
            <option value="Blanc">Blanc</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="origine">Origine</label>
          <input type="text" id="origine" [(ngModel)]="chocolat.origine" name="origine" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500">
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="description">Description</label>
          <textarea id="description" [(ngModel)]="chocolat.description" name="description"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500"
                    rows="3"></textarea>
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="prix">Prix (€)</label>
          <input type="number" id="prix" [(ngModel)]="chocolat.prix" name="prix" required
                 class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-chocolate-500">
        </div>

        <div class="flex gap-4">
          <button type="submit" 
                  class="bg-chocolate-600 text-white px-6 py-2 rounded-lg hover:bg-chocolate-700 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ isEditMode ? 'Modifier' : 'Ajouter' }}
          </button>
          <button type="button" (click)="goBack()"
                  class="bg-chocolate-400 text-white px-6 py-2 rounded-lg hover:bg-chocolate-500 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Annuler
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class ChocolatFormComponent implements OnInit {
  chocolat: Chocolat = {
    nom: '',
    type: '',
    origine: '',
    description: '',
    prix: 0
  };
  isEditMode = false;

  constructor(
    private chocolatService: ChocolatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
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
      error: (error) => {
        console.error('Erreur lors du chargement du chocolat:', error);
        alert('Erreur lors du chargement du chocolat');
      }
    });
  }

  onSubmit(): void {
    console.log('Soumission du formulaire:', this.chocolat);
    
    if (!this.chocolat.nom || !this.chocolat.type || !this.chocolat.origine || !this.chocolat.prix) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (this.isEditMode && this.chocolat._id) {
      this.chocolatService.updateChocolat(this.chocolat._id, this.chocolat).subscribe({
        next: () => {
          console.log('Chocolat modifié avec succès');
          this.goBack();
        },
        error: (error) => {
          console.error('Erreur lors de la modification:', error);
          alert('Erreur lors de la modification du chocolat');
        }
      });
    } else {
      this.chocolatService.createChocolat(this.chocolat).subscribe({
        next: () => {
          console.log('Chocolat créé avec succès');
          this.goBack();
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          alert('Erreur lors de la création du chocolat');
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/chocolats']);
  }
}
