import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <ScrollView style={styles.scrollContainer}>
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
                       <Typography>{g.name}</Typography>
                   </View>
               ))}
            </View>
            <Typography type="defaultSemiBold">Overview</Typography>
            <Typography>{movie.overview}</Typography>      
          </View>
        </ScrollView>
        <View style={[styles.footer, { backgroundColor: theme.background }]}>
          <Pressable
            onPress={handleToggleSave}
            style={[styles.button, { backgroundColor: isMovieSaved ? theme.tint : theme.tint }]}
          >
            <Typography type="defaultSemiBold" style={{ color: theme.background }}>{isMovieSaved ? "Remove from Saved" : "Save Movie"}</Typography>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
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
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
  },
  metaText: {
    opacity: 0.8,
    marginRight: 4,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    borderWidth: 1,
    borderRadius: 80,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopColor: '#ccc',
  },
  button: {
    opacity: 0.95,
    padding: 16,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
