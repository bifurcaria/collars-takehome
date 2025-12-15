import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, View } from 'react-native';

import { getMovieDetails } from '@/api/tmdb';
import { Typography } from '@/components/Typography';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useSavedMovies } from '@/hooks/useSavedMovies';

const TMDB_IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL;

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { isSaved, saveMovie, removeMovie } = useSavedMovies();
  
  const isMovieSaved = isSaved(Number(id));

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetails(Number(id)),
    enabled: !!id,
  });

  const handleToggleSave = async () => {
    if (!movie) return;
    
    try {
        if (isMovieSaved) {
            await removeMovie(movie.id);
        } else {
            await saveMovie(movie);
        }
    } catch (e) {
        Alert.alert("Error", "Failed to update saved movies");
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background, flex: 1 }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={[styles.centered, { backgroundColor: theme.background, flex: 1 }]}>
        <Typography>Error loading movie details</Typography>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: movie.title, headerBackTitle: 'Movies' }} />
      <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
        <Image
          source={{ uri: movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` }}
          style={styles.backdrop}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Typography type="title">{movie.title}</Typography>
          
          <View style={styles.metaRow}>
            <Typography style={styles.metaText}>
              {new Date(movie.release_date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
            </Typography>
            <Typography style={styles.metaText}>
               • {movie.runtime} min
            </Typography>
            <Typography style={styles.metaText}>
               • {movie.vote_average.toFixed(1)}/10
            </Typography>
          </View>

          <View style={styles.genres}>
             {movie.genres.map(g => (
                 <View key={g.id} style={[styles.genreTag, { borderColor: theme.text }]}>
                     <Typography style={styles.genreText}>{g.name}</Typography>
                 </View>
             ))}
          </View>

          <View style={styles.actions}>
              <Button 
                title={isMovieSaved ? "Remove from Saved" : "Save Movie"} 
                onPress={handleToggleSave}
                color={isMovieSaved ? 'red' : theme.tint}
              />
          </View>

          <Typography type="subtitle" style={styles.sectionTitle}>Overview</Typography>
          <Typography style={styles.overview}>{movie.overview}</Typography>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaText: {
    opacity: 0.8,
    marginRight: 4,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genreTag: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 12,
  },
  actions: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  overview: {
    opacity: 0.9,
  },
});
