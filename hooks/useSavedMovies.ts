import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MovieDetails } from '../types/tmdb';

const STORAGE_KEY = 'saved_movies';

export const useSavedMovies = () => {
  const queryClient = useQueryClient();

  const { data: savedMovies = [], isLoading } = useQuery({
    queryKey: ['savedMovies'],
    queryFn: async () => {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? (JSON.parse(jsonValue) as MovieDetails[]) : [];
    },
  });

  const saveMovieMutation = useMutation({
    mutationFn: async (movie: MovieDetails) => {
      const currentMovies = savedMovies;
      if (!currentMovies.find((m) => m.id === movie.id)) {
        const newMovies = [...currentMovies, movie];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMovies));
        return newMovies;
      }
      return currentMovies;
    },
    onSuccess: (newMovies) => {
      queryClient.setQueryData(['savedMovies'], newMovies);
    },
  });

  const removeMovieMutation = useMutation({
    mutationFn: async (movieId: number) => {
      const currentMovies = savedMovies;
      const newMovies = currentMovies.filter((m) => m.id !== movieId);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMovies));
      return newMovies;
    },
    onSuccess: (newMovies) => {
      queryClient.setQueryData(['savedMovies'], newMovies);
    },
  });

  const isSaved = (movieId: number) => {
    return savedMovies.some((m) => m.id === movieId);
  };

  return {
    savedMovies,
    isLoading,
    saveMovie: saveMovieMutation.mutate,
    removeMovie: removeMovieMutation.mutate,
    isSaved,
  };
};


