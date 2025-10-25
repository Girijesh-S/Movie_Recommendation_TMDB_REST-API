# Movie Recommendation Using TMDB REST API

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.6.

This project uses the TMDB (The Movie Database) REST API to build a movie recommendation system. It allows users to get movie recommendations based on their preferences and displays details like movie title, overview, cast details, release date, watch trailer, etc.

## Features

- Fetch movie data from TMDB using the REST API.
- Provide personalized movie recommendations based on genre, popularity, rating, durations.
- Display movie details such as title, release date, overview, and poster.

## Tech Stack

- **Frontend Framework**: Angular(Handles HTTP Requests)
- **Languages**: Typescript, HTML, CSS 
  - `requests`: To interact with the TMDB REST API(Server)
  - `json`: For parsing the JSON responses

## Installation

### Prerequisites

- TMDB API Key (You need to sign up for an account on TMDB and generate an API key)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Girijesh-S/Movie_Recommendation_TMDB_REST-API.git
## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## Building

To build the project run:

```bash
ng build
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
