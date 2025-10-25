import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { 
  Movie, 
  MovieResponse, 
  Genre, 
  VideoResults, 
  CreditResults,
  FilterPreferences 
} from '../models/movie.models';
import { map, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private http = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;

  private activeTrailerPlayer: any = null;

  getGenres(): Observable<Genre[]> {
    return this.http.get<{ genres: Genre[] }>(
      `${this.baseUrl}/genre/movie/list`,
      { params: { api_key: this.apiKey } }
    ).pipe(map(response => response.genres));
  }

  discoverMovies(filters: FilterPreferences): Observable<Movie[]> {
    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('sort_by', 'popularity.desc')
      .set('include_adult', 'false')
      .set('include_video', 'true');

    if (filters.genres && filters.genres.length > 0) {
      params = params.set('with_genres', filters.genres.join(','));
    }

    if (filters.year) {
      params = params.set('year', filters.year.toString());
    }

    if (filters.minRating) {
      params = params.set('vote_average.gte', filters.minRating.toString());
    }

    if (filters.language) {
      params = params.set('with_original_language', filters.language);
    }

    return this.http.get<MovieResponse>(
      `${this.baseUrl}/discover/movie`,
      { params }
    ).pipe(map(response => response.results.slice(0, 20)));
  }

  getMovieVideos(movieId: number): Observable<VideoResults> {
    return this.http.get<VideoResults>(
      `${this.baseUrl}/movie/${movieId}/videos`,
      { params: { api_key: this.apiKey } }
    ).pipe(
      catchError(error => {
        console.error('Error fetching videos:', error);
        // Return empty results if there's an error
        return of({ results: [] });
      })
    );
  }

  getMovieCredits(movieId: number): Observable<CreditResults> {
    return this.http.get<CreditResults>(
      `${this.baseUrl}/movie/${movieId}/credits`,
      { params: { api_key: this.apiKey } }
    ).pipe(
      catchError(error => {
        console.error('Error fetching credits:', error);
        // Return empty results if there's an error
        return of({ cast: [], crew: [] });
      })
    );
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${this.baseUrl}/movie/${movieId}`,
      { params: { api_key: this.apiKey } }
    );
  }

  // Method to manage trailer players and prevent conflicts
  setActiveTrailerPlayer(player: any) {
    if (this.activeTrailerPlayer && this.activeTrailerPlayer !== player) {
      // Pause previous player
      if (this.activeTrailerPlayer.pauseVideo) {
        this.activeTrailerPlayer.pauseVideo();
      }
    }
    this.activeTrailerPlayer = player;
  }

  clearActiveTrailerPlayer(player: any) {
    if (this.activeTrailerPlayer === player) {
      this.activeTrailerPlayer = null;
    }
  }
}
