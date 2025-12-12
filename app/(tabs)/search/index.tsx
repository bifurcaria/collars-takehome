import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import { searchMovies } from '@/api/tmdb';
import { MovieListItem } from '@/components/MovieListItem';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();
  const [query, setQuery] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search movies...",
        onChangeText: (event: any) => setQuery(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => {
      if (query.length > 0) {
        return searchMovies(query);
      }
      return { results: [] };
    },
    enabled: query.length > 0,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.tint} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.text }}>Error searching movies</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={data?.results || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        contentContainerStyle={styles.listContent}
        contentInsetAdjustmentBehavior="automatic"
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={{ color: theme.text, marginTop: 20 }}>
              {query.length > 0 ? "No movies found" : "Search for movies"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});
