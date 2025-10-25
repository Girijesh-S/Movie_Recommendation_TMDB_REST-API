import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie, FilterPreferences } from '../../models/movie.models';
import { TmdbService } from '../../services/tmdb.service';
import { MovieCardComponent } from '../movie-card/movie-card';
import { FilterPreferencesComponent } from '../filter-preferences/filter-preferences';

@Component({
  selector: 'app-movie-recommendations',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FilterPreferencesComponent],
  templateUrl: './movie-recommendations.html',
  styleUrls: ['./movie-recommendations.css']
})
export class MovieRecommendationsComponent implements OnInit {
  private tmdbService = inject(TmdbService);

  movies: Movie[] = [];
  isLoading = false;
  error: string | null = null;
  currentFilters: FilterPreferences = {
    genres: [],
    year: undefined,
    minRating: 0,
    maxRating: 10,
    language: '',
    duration: ''
  };

  ngOnInit() {
    this.loadRecommendations();
  }

  onFiltersChanged(filters: FilterPreferences): void {
    this.currentFilters = filters;
    this.loadRecommendations();
  }

  loadRecommendations(): void {  // Changed from private to public
    this.isLoading = true;
    this.error = null;

    this.tmdbService.discoverMovies(this.currentFilters).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading recommendations:', error);
        this.error = 'Failed to load movie recommendations. Please try again.';
        this.isLoading = false;
        this.movies = [];
      }
    });
  }

  trackByMovieId(index: number, movie: Movie): number {
    return movie.id;
  }
}