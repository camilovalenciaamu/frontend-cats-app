import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CatBreedModel } from '../../../core/models/cat-breed.model';
import { GetCatBreedsUseCase } from '../../../core/use-cases/get-cat-breeds.usecase';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-breed-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './breed-selector.component.html',
  styleUrl: './breed-selector.component.scss',
})
export class BreedSelectorComponent implements OnInit {
  breeds: CatBreedModel[] = [];
  selectedId = '';
  @Output() breedSelected = new EventEmitter<CatBreedModel | null>();

  constructor(private getCatBreeds: GetCatBreedsUseCase) {}

  ngOnInit() {
    this.getCatBreeds.execute().subscribe((b) => (this.breeds = b));
  }

  onSelect() {
    const selected = this.breeds.find((b) => b.id === this.selectedId) ?? null;
    this.breedSelected.emit(selected);
  }
}
