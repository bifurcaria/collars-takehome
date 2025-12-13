import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { getPopularMovies, getUpcomingMovies } from '@/api/tmdb';
import { FilterHeader } from '@/components/FilterHeader';
import { MovieListItem } from '@/components/MovieListItem';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

type FilterType = 'popular' | 'upcoming';

export default function MoviesScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  
  const [filter, setFilter] = useState<FilterType>('popular');

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', filter],
    queryFn: () => filter === 'popular' ? getPopularMovies() : getUpcomingMovies(),
  });

  if (isLoading && !data) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Error loading movies</Text>
      </View>
    );
  }

  return (
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={data?.results || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <FilterHeader 
            filter={filter} 
            setFilter={setFilter} 
            colorScheme={colorScheme}
          />
        }
        ListEmptyComponent={
            <View style={styles.centered}>
                <Text style={{ color: theme.text, marginTop: 20 }}>No movies found</Text>
            </View>
        }
      />
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
  listContent: {
    paddingBottom: 20,
  },
});
