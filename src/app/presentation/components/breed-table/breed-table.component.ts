import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CatBreedModel } from '../../../core/models/cat-breed.model';
import { GetCatBreedsUseCase } from '../../../core/use-cases/get-cat-breeds.usecase';

@Component({
  selector: 'app-breed-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './breed-table.component.html',
  styleUrl: './breed-table.component.scss',
})
export class BreedTableComponent {
  breeds: CatBreedModel[] = [];
  filteredBreeds: CatBreedModel[] = [];
  searchText = '';

  constructor(private getCatBreeds: GetCatBreedsUseCase) {}

  ngOnInit(): void {
    this.getCatBreeds.execute().subscribe((breeds) => {
      this.breeds = breeds;
      this.filteredBreeds = breeds;
    });
  }

  filterBreeds(): void {
    const query = this.searchText.toLowerCase().trim();
    this.filteredBreeds = this.breeds.filter(
      (breed) =>
        breed.name.toLowerCase().includes(query) ||
        breed.origin.toLowerCase().includes(query) ||
        breed.temperament.toLowerCase().includes(query)
    );
  }
}
