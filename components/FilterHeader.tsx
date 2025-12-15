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

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.header, { backgroundColor: Platform.select({ default: theme.background }) }]}>
        <View style={styles.filterContainer}>
          <Pressable
            onPress={() => setFilter('popular')}
            style={[
              styles.iosFilterButton,
              filter === 'popular' && { backgroundColor: theme.text },
              filter !== 'popular' && { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }
            ]}
          >
            <Typography style={[
              styles.filterText,
              { color: filter === 'popular' ? theme.background : theme.text }
            ]}>Popular</Typography>
          </Pressable>
          <Pressable
            onPress={() => setFilter('upcoming')}
            style={[
              styles.iosFilterButton,
              filter === 'upcoming' && { backgroundColor: theme.text },
              filter !== 'upcoming' && { backgroundColor: colorScheme === 'dark' ? '#333' : '#f0f0f0' }
            ]}
          >
            <Typography style={[
              styles.filterText,
              { color: filter === 'upcoming' ? theme.background : theme.text }
            ]}>Upcoming</Typography>
          </Pressable>
        </View>
      </View>
    );
  }

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
    padding: Platform.select({ ios: 12, default: 0 }),
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
  iosFilterButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

