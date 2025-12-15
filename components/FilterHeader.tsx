import Colors from '@/constants/Colors';
import { Typography as FontTypography } from '@/constants/Typography';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Typography } from './Typography';

type FilterType = 'popular' | 'upcoming';

interface FilterHeaderProps {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  colorScheme: 'light' | 'dark' | null | undefined;
}

export function FilterHeader({ filter, setFilter, colorScheme }: FilterHeaderProps) {
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <View style={styles.filterContainer}>
        <Pressable
          onPress={() => setFilter('popular')}
          style={[
            styles.filterButton,
            filter === 'popular' && { backgroundColor: theme.tint },
            { borderColor: theme.tint }
          ]}
        >
          <Typography style={[
            styles.filterText, 
            { color: filter === 'popular' ? '#fff' : theme.text }
          ]}>Popular</Typography>
        </Pressable>
        <Pressable
          onPress={() => setFilter('upcoming')}
          style={[
            styles.filterButton,
            filter === 'upcoming' && { backgroundColor: theme.tint },
            { borderColor: theme.tint }
          ]}
        >
          <Typography style={[
            styles.filterText, 
            { color: filter === 'upcoming' ? '#fff' : theme.text }
          ]}>Upcoming</Typography>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontFamily: FontTypography.bodyBold,
    fontWeight: '600',
  },
});

