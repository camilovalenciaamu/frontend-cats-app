import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CatGateway } from '../../core/gateways/cat.gateway';
import { CatBreedModel } from '../../core/models/cat-breed.model';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatApiService implements CatGateway {
  private readonly baseUrl = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<CatBreedModel[]> {
    return this.http.get<any[]>(`${this.baseUrl}/breeds`).pipe(
      map((breeds) =>
        breeds.map((b) => ({
          id: b.id,
          name: b.name,
          description: b.description,
          origin: b.origin,
          temperament: b.temperament,
          life_span: b.life_span,
          imageUrls: b.reference_image_id
            ? [`https://cdn2.thecatapi.com/images/${b.reference_image_id}.jpg`]
            : [],
        }))
      )
    );
  }

  getImagesByBreedId(breedId: string): Observable<string[]> {
    const params = new HttpParams().set('breed_id', breedId).set('limit', 5);
    return this.http
      .get<any[]>(`${this.baseUrl}/images/search`, { params })
      .pipe(map((images) => images.map((i) => i.url)));
  }
}
