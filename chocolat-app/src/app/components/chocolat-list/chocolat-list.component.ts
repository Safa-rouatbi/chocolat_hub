// src/app/components/chocolat-list/chocolat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChocolatService, Chocolat } from '../../services/chocolat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chocolat-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chocolat-list.component.html',
  styleUrls: ['./chocolat-list.component.css']
})
export class ChocolatListComponent implements OnInit {
  chocolats: Chocolat[] = [];
  newChocolat: Chocolat = { nom: '', type: '', origine: '', description: '', prix: 0 };

  constructor(private chocolatService: ChocolatService) {}

  ngOnInit() {
    this.loadChocolats();
  }

  loadChocolats() {
    this.chocolatService.getAll().subscribe(data => this.chocolats = data);
  }

  addChocolat() {
    this.chocolatService.add(this.newChocolat).subscribe(() => {
      this.newChocolat = { nom: '', type: '', origine: '', description: '', prix: 0 };
      this.loadChocolats();
    });
  }

  deleteChocolat(id: string | undefined) {
    if (!id) return;
    this.chocolatService.delete(id).subscribe(() => this.loadChocolats());
  }
}
