import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CatBreedModel } from '../../../core/models/cat-breed.model';
import { CatApiService } from '../../../data/services/cat-api.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-breed-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './breed-carousel.component.html',
  styleUrl: './breed-carousel.component.scss',
})
export class BreedCarouselComponent implements OnChanges {
  @Input() breed: CatBreedModel | null = null;
  images: string[] = [];
  current = 0;

  constructor(private api: CatApiService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['breed'] && this.breed) {
      this.api.getImagesByBreedId(this.breed.id).subscribe((imgs) => {
        this.images = imgs;
        this.current = 0;
      });
    }
  }

  prev() {
    this.current = (this.current - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.current = (this.current + 1) % this.images.length;
  }
}
