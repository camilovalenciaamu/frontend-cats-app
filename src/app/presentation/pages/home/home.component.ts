import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatBreedModel } from '../../../core/models/cat-breed.model';
import { CommonModule } from '@angular/common';
import { BreedCarouselComponent } from '../../components/breed-carousel/breed-carousel.component';
import { CatApiService } from '../../../data/services/cat-api.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    BreedCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  breeds: CatBreedModel[] = [];
  selectedBreed: CatBreedModel | null = null;
  isMobile = false;

  constructor(private api: CatApiService) {
    this.loadBreeds();
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  loadBreeds() {
    this.api.getBreeds().subscribe((breeds) => {
      this.breeds = breeds;
      this.selectedBreed = breeds[0];
    });
  }
}
