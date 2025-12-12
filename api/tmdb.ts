import { Movie, MovieDetails, PaginatedResponse } from '../types/tmdb';

const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

const headers = {
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  Accept: 'application/json',
};

// Helper to handle fetch requests
async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY || '', // Query param auth fallback if Bearer fails or for simplicity
    language: 'en-US',
    ...params,
  }).toString();

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const getPopularMovies = (page = 1) =>
  fetchTMDB<PaginatedResponse<Movie>>('/movie/popular', { page: page.toString() });

export const getUpcomingMovies = (page = 1) =>
  fetchTMDB<PaginatedResponse<Movie>>('/movie/upcoming', { page: page.toString() });

export const searchMovies = (query: string, page = 1) =>
  fetchTMDB<PaginatedResponse<Movie>>('/search/movie', { query, page: page.toString() });

export const getMovieDetails = (id: number) =>
  fetchTMDB<MovieDetails>(`/movie/${id}`, { append_to_response: 'videos' });


