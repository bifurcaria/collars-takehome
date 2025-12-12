import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { getMovieDetails } from '@/api/tmdb';
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
        <Text style={{ color: theme.text }}>Error loading movie details</Text>
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
          <Text style={[styles.title, { color: theme.text }]}>{movie.title}</Text>
          
          <View style={styles.metaRow}>
            <Text style={[styles.metaText, { color: theme.text }]}>
              {new Date(movie.release_date).getFullYear()}
            </Text>
            <Text style={[styles.metaText, { color: theme.text }]}>
               • {movie.runtime} min
            </Text>
            <Text style={[styles.metaText, { color: theme.text }]}>
               • {movie.vote_average.toFixed(1)}/10
            </Text>
          </View>

          <View style={styles.genres}>
             {movie.genres.map(g => (
                 <View key={g.id} style={[styles.genreTag, { borderColor: theme.text }]}>
                     <Text style={[styles.genreText, { color: theme.text }]}>{g.name}</Text>
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

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Overview</Text>
          <Text style={[styles.overview, { color: theme.text }]}>{movie.overview}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 14,
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
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.9,
  },
});
