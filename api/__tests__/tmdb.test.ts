import { getPopularMovies, searchMovies } from '../tmdb';

const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ results: [] }),
  })
) as jest.Mock;

describe('TMDB API', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('fetches popular movies with correct URL', async () => {
    await getPopularMovies(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const url = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain(`${TMDB_BASE_URL}/movie/popular`);
    expect(url).toContain('page=1');
  });

  it('searches movies with correct query', async () => {
    await searchMovies('avatar');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const url = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(url).toContain(`${TMDB_BASE_URL}/search/movie`);
    expect(url).toContain('query=avatar');
  });

  it('throws error on failed request', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      })
    );

    await expect(getPopularMovies()).rejects.toThrow('TMDB API Error: 500 Server Error');
  });
});


