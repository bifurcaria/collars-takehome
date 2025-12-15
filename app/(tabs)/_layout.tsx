import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <NativeTabs
      tintColor={theme.tint}
      backgroundColor={theme.background}
      indicatorColor={"transparent"}
      labelVisibilityMode={Platform.OS === 'android' ? 'labeled' : undefined}
    >
      <NativeTabs.Trigger name="index" options={{ title: 'Movies' }}>
      {Platform.select({
          ios: <Icon sf="film" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="movie" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saved" options={{ title: 'Saved' }}>
        {Platform.select({
          ios: <Icon sf="heart" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="favorite" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search" options={{ title: 'Search' }} >
        {Platform.select({
          ios: <Label>Search</Label>,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="search" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
