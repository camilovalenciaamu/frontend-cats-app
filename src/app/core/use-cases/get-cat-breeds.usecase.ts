import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatBreedModel } from '../models/cat-breed.model';
import { CatGateway } from '../gateways/cat.gateway';

@Injectable({ providedIn: 'root' })
export class GetCatBreedsUseCase {
  constructor(private catGateway: CatGateway) {}

  execute(): Observable<CatBreedModel[]> {
    return this.catGateway.getBreeds();
  }
}
