# React Native Movies App

A React Native mobile application built with Expo that displays movies using the TMDB API. It supports offline caching for saved movies and features a clean, native UI with light and dark mode support.

## Features

- **Movies Tab**: Browse "Popular" and "Upcoming" movies.
- **Search**: Search for movies by title.
- **Movie Details**: View full movie details including release date, runtime, genres, rating, and overview.
- **Trailers**: Watch movie trailers directly in the app (via YouTube).
- **Saved Movies**: Save movies to your personal list.
- **Offline Support**: Saved movies are cached locally and available offline.
- **Dark Mode**: Fully supported light and dark themes based on system settings.

## Setup Instructions

### Prerequisites
- Node.js installed.
- Expo Go app on your physical device or an iOS Simulator/Android Emulator.
- A [TMDB API Key](https://www.themoviedb.org/documentation/api).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd collars-takehome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API Key:
   - Create a `.env` file in the root directory (optional but recommended for security, though the current implementation also checks for a fallback constant in `constants/Config.ts`).
   - Or simply open `constants/Config.ts` and replace `'YOUR_TMDB_API_KEY'` with your actual API key.
     ```typescript
     export const TMDB_API_KEY = 'your_actual_api_key_here';
     ```

4. Run the app:
   ```bash
   npx expo start
   ```
   - Press `i` for iOS Simulator.
   - Press `a` for Android Emulator.
   - Scan the QR code with Expo Go on your phone.

## Architecture

This project uses a modular architecture powered by **Expo Router** for file-based navigation.

### Structure
- **app/**: Contains the screens and navigation layout.
  - `(tabs)/`: The main tab interface (Movies, Saved).
  - `movie/[id].tsx`: The dynamic movie detail route.
  - `_layout.tsx`: Root layout with Providers (QueryClient, Theme).
- **api/**: API service functions handling TMDB requests using `fetch`.
- **components/**: Reusable UI components (`MovieListItem`, etc.).
- **hooks/**: Custom hooks (e.g., `useSavedMovies` for managing offline data).
- **types/**: TypeScript definitions for API responses and models.
- **constants/**: Configuration and theme constants.

### Key Decisions
- **TanStack Query**: Used for server state management (fetching movies). It handles caching, loading states, and error states out of the box.
- **AsyncStorage**: Used for persisting "Saved" movies locally on the device, ensuring they are available offline.
- **Native Fetch**: Used instead of Axios to keep the bundle size small and reduce dependencies, as the requirements were simple.
- **Expo Router**: Provides native navigation with a simple file-based API.

## Technologies Used

- **React Native** (Expo SDK 50+)
- **TypeScript**
- **Expo Router**
- **TanStack Query** (React Query)
- **AsyncStorage**
- **Jest & Testing Library**

## Testing

The project includes unit tests for API logic and components.

Run tests with:
```bash
npm test
```

- `api/__tests__/tmdb.test.ts`: Tests the API fetcher functions.
- `components/__tests__/MovieListItem.test.tsx`: Tests the rendering of movie items.


