import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRecommendationsComponent } from './components/movie-recommendations/movie-recommendations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MovieRecommendationsComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <h1>Movie Recommendation System</h1>
          <p class="subtitle">Discover your next favorite movie</p>
        </div>
      </header>

      <main class="app-main">
        <app-movie-recommendations></app-movie-recommendations>
      </main>

      <footer class="app-footer">
        <p>Powered by TMDb API</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
      color: white;
    }
    .app-header {
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      padding: 30px 20px;
      text-align: center;
      border-bottom: 1px solid #333;
    }
    .header-content h1 {
      margin: 0;
      font-size: 2.5em;
      font-weight: 700;
      background: linear-gradient(45deg, #e50914, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      margin: 10px 0 0 0;
      color: #ccc;
      font-size: 1.1em;
      font-weight: 300;
    }
    .app-main {
      flex: 1;
      padding-bottom: 40px;
    }
    .app-footer {
      background: rgba(0, 0, 0, 0.9);
      padding: 20px;
      text-align: center;
      color: #666;
      border-top: 1px solid #333;
    }
  `]
})
export class AppComponent {}
