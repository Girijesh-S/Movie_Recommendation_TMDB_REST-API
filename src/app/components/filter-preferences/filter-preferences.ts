import { Component, OnInit, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPreferences, Genre } from '../../models/movie.models';
import { TmdbService } from '../../services/tmdb.service';

@Component({
  selector: 'app-filter-preferences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-preferences.html',
  styleUrls: ['./filter-preferences.css']
})
export class FilterPreferencesComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FilterPreferences>();

  private tmdbService = inject(TmdbService);

  // Use regular properties instead of signals for template compatibility
  filters: FilterPreferences = {
    genres: [],
    year: undefined,
    minRating: 0,
    maxRating: 10,
    language: '',
    duration: ''
  };

  genres: Genre[] = [];
  currentYear = new Date().getFullYear();
  years: number[] = [];
  
  languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'hi', name: 'Hindi' }
  ];

  durationOptions = [
    { value: '', label: 'Any Duration' },
    { value: 'short', label: 'Short (< 90 min)' },
    { value: 'medium', label: 'Medium (90-150 min)' },
    { value: 'long', label: 'Long (> 150 min)' }
  ];

  ngOnInit() {
    this.generateYears();
    this.loadGenres();
    this.emitFilters();
  }

  private generateYears(): void {
    for (let year = this.currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  private loadGenres(): void {
    this.tmdbService.getGenres().subscribe({
      next: (genres) => this.genres = genres,
      error: (error) => console.error('Error loading genres:', error)
    });
  }

  onGenreChange(genreId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    
    if (isChecked) {
      this.filters.genres.push(genreId);
    } else {
      const index = this.filters.genres.indexOf(genreId);
      if (index > -1) {
        this.filters.genres.splice(index, 1);
      }
    }
    this.emitFilters();
  }

  onFilterChange(): void {
    this.emitFilters();
  }

  clearFilters(): void {
    this.filters = {
      genres: [],
      year: undefined,
      minRating: 0,
      maxRating: 10,
      language: '',
      duration: ''
    };
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChanged.emit({ ...this.filters });
  }
}