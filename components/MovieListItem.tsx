import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import { Movie } from '../types/tmdb';
import { Typography } from './Typography';
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
                <View style={styles.titleContainer}>
              <Typography style={styles.title} type="defaultSemiBold">{movie.title}</Typography>
              <Typography style={styles.date}>
                {new Date(movie.release_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </Typography>
              </View>
              <Typography numberOfLines={3} style={styles.overview}>
                {movie.overview}
              </Typography>
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
    gap: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: 4,
  },
  title: {
    fontSize: 16,
    flex: 1,
    textOverflow: 'ellipsis'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
  },
  overview: {
    fontSize: 14,
  },
});
