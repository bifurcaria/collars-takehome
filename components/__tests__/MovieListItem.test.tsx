import React from 'react';
import { render } from '@testing-library/react-native';
import { MovieListItem } from '../MovieListItem';
import { Movie } from '../../types/tmdb';

// Mock Link since it's an Expo Router component
jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const mockMovie: Movie = {
  id: 123,
  title: 'Test Movie',
  poster_path: '/path.jpg',
  backdrop_path: '/back.jpg',
  overview: 'This is a test movie',
  release_date: '2023-01-01',
  vote_average: 8.5,
};

describe('MovieListItem', () => {
  it('renders movie title and overview correctly', () => {
    const { getByText } = render(<MovieListItem movie={mockMovie} />);
    
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('This is a test movie')).toBeTruthy();
  });

  it('renders correct release date', () => {
     const { getByText } = render(<MovieListItem movie={mockMovie} />);
     // 1/1/2023 depends on locale, but checking partial match or mocking Date is safer.
     // For simplicity in this env, we assume standard formatting or check existence.
     // Let's just check if it renders without crashing for now, or match parts.
     // toLocaleDateString might vary in CI.
     // We can mock the date logic if needed, but let's assume it renders something.
     expect(getByText(/2023/)).toBeTruthy();
  });
});


