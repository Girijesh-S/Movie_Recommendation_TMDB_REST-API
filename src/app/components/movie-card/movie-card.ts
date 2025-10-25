import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie, Video, Cast } from '../../models/movie.models';
import { TmdbService } from '../../services/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css']
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() movie!: Movie;
  
  private tmdbService = inject(TmdbService);
  private sanitizer = inject(DomSanitizer);
  
  showDetails = false;
  trailers: Video[] = [];
  cast: Cast[] = [];
  isLoading = false;
  activeTrailerUrl: SafeResourceUrl | null = null;
  youtubePlayer: any = null;
  hasTrailers = false;
  trailersLoaded = false;

  ngOnInit() {}

  ngOnDestroy() {
    this.cleanupTrailer();
  }

  toggleDetails(): void {
    if (!this.showDetails && !this.trailersLoaded) {
      this.loadMovieDetails();
    } else {
      this.showDetails = !this.showDetails;
    }
  }

  private loadMovieDetails(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    
    // Load videos and credits
    this.tmdbService.getMovieVideos(this.movie.id).subscribe({
      next: (videosResponse) => {
        this.trailers = videosResponse.results.filter(video => 
          video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );
        this.hasTrailers = this.trailers.length > 0;
        this.trailersLoaded = true;
        
        // Load credits after videos
        this.loadCredits();
      },
      error: (error) => {
        console.error('Error loading movie videos:', error);
        this.hasTrailers = false;
        this.trailersLoaded = true;
        this.loadCredits();
      }
    });
  }

  private loadCredits(): void {
    this.tmdbService.getMovieCredits(this.movie.id).subscribe({
      next: (credits) => {
        this.cast = credits.cast.slice(0, 6); // Top 6 cast members
        this.isLoading = false;
        this.showDetails = true;
      },
      error: (error) => {
        console.error('Error loading movie credits:', error);
        this.cast = [];
        this.isLoading = false;
        this.showDetails = true;
      }
    });
  }

  playTrailer(video: Video): void {
    this.cleanupTrailer();
    
    // Create safe YouTube URL
    const youtubeUrl = `https://www.youtube.com/embed/${video.key}?autoplay=1&enablejsapi=1&rel=0`;
    this.activeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);
    
    // Register the active player
    setTimeout(() => {
      const iframe = document.getElementById(`trailer-${this.movie.id}`) as HTMLIFrameElement;
      if (iframe) {
        this.youtubePlayer = iframe;
        this.tmdbService.setActiveTrailerPlayer(this);
      }
    }, 100);
  }

  closeTrailer(): void {
    this.cleanupTrailer();
    this.activeTrailerUrl = null;
  }

  private cleanupTrailer(): void {
    if (this.youtubePlayer) {
      this.tmdbService.clearActiveTrailerPlayer(this);
      
      // Stop the video by reloading the iframe
      if (this.youtubePlayer.src) {
        this.youtubePlayer.src = '';
      }
      
      this.youtubePlayer = null;
    }
  }

  getPosterUrl(posterPath: string | null): string {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500${posterPath}`;
    }
    return 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Poster';
  }

  getCastPhotoUrl(profilePath: string | null): string {
    if (profilePath) {
      return `https://image.tmdb.org/t/p/w200${profilePath}`;
    }
    return 'https://via.placeholder.com/200x200/1a1a1a/666666?text=No+Photo';
  }

  getRatingColor(rating: number): string {
    if (rating >= 7) return '#21d07a';
    if (rating >= 5) return '#d2d531';
    return '#db2360';
  }

  getYearFromDate(date: string): string {
    return date ? date.split('-')[0] : 'N/A';
  }

  onPosterError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Poster';
  }

  onCastPhotoError(event: Event, person: any): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://via.placeholder.com/200x200/1a1a1a/666666?text=No+Photo';
  }
}
