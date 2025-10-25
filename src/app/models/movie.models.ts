export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  runtime?: number;
  genres?: Genre[];
  videos?: VideoResults;
  credits?: CreditResults;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  name: string;
  type: string;
  site: string;
}

export interface VideoResults {
  results: Video[];
}

export interface CreditResults {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface FilterPreferences {
  genres: number[];
  year?: number;
  minRating?: number;
  maxRating?: number;
  language?: string;
  duration?: string;
  cast?: string[];
}