import Colors from '@/constants/Colors';
import { Typography as FontTypography } from '@/constants/Typography';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
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
    <View style={[styles.header, { backgroundColor: Platform.select({ ios: 'transparent', default: theme.background }) }]}>
      <View style={styles.filterContainer}>
        <Pressable
          onPress={() => setFilter('popular')}
          style={[
            styles.filterButton,
            filter === 'popular' && { borderBottomColor: theme.text, borderBottomWidth: 2 },
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
            filter === 'upcoming' && { borderBottomColor: theme.text, borderBottomWidth: 2 },
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
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  filterText: {
    fontFamily: FontTypography.bodyBold,
    fontWeight: '600',
    fontSize: 14,
  },
});

