import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Movie } from '../types/tmdb';
import { useColorScheme } from './useColorScheme';

const TMDB_IMAGE_BASE_URL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL;

interface MovieListItemProps {
  movie: Movie;
}

export const MovieListItem = ({ movie }: MovieListItemProps) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.container, { opacity: pressed ? 0.7 : 1, backgroundColor: theme.background }]}>
            <Image
              source={{ uri: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/100x150' }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={[styles.title, { color: theme.text }]}>{movie.title}</Text>
              <Text style={[styles.date, { color: theme.text }]}>
                {new Date(movie.release_date).toLocaleDateString()}
              </Text>
              <Text numberOfLines={3} style={[styles.overview, { color: theme.text }]}>
                {movie.overview}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  overview: {
    fontSize: 14,
    opacity: 0.8,
  },
});


