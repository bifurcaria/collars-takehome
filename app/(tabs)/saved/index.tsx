import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { MovieListItem } from '@/components/MovieListItem';
import { Typography } from '@/components/Typography';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useSavedMovies } from '@/hooks/useSavedMovies';

export default function SavedScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const { savedMovies, isLoading } = useSavedMovies();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <Typography>Loading...</Typography>
      </View>
    );
  }

  return (
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieListItem movie={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Typography style={{ marginTop: 20 }}>No saved movies yet.</Typography>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});
