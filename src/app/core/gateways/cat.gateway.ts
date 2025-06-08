import { Observable } from 'rxjs';
import { CatBreedModel } from '../models/cat-breed.model';
import { Injectable } from '@angular/core';

export interface CatGateway {
  getBreeds(): Observable<CatBreedModel[]>;
  getImagesByBreedId(breedId: string): Observable<string[]>;
}
