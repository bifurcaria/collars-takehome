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
  const trackColor = colorScheme === 'dark' ? '#333' : '#e5e5e5';

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <View style={[styles.filterContainer, { backgroundColor: trackColor }]}>
        <Pressable
          onPress={() => setFilter('popular')}
          style={[
            styles.filterButton,
            filter === 'popular' && { backgroundColor: theme.background, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
          ]}
        >
          <Typography style={[
            styles.filterText, 
            { color: theme.text, opacity: filter === 'popular' ? 1 : 0.6 }
          ]}>Popular</Typography>
        </Pressable>
        <Pressable
          onPress={() => setFilter('upcoming')}
          style={[
            styles.filterButton,
            filter === 'upcoming' && { backgroundColor: theme.background, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
          ]}
        >
          <Typography style={[
            styles.filterText, 
            { color: theme.text, opacity: filter === 'upcoming' ? 1 : 0.6 }
          ]}>Upcoming</Typography>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  filterContainer: {
    flexDirection: 'row',
    borderRadius: 32,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 32,
  },
  filterText: {
    fontFamily: FontTypography.bodyBold,
    fontWeight: '600',
    fontSize: 14,
  },
});

