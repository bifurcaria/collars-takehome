import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <NativeTabs
      tintColor={theme.tint}
      backgroundColor={theme.background}
    >
      <NativeTabs.Trigger name="index" options={{ title: 'Movies' }}>
         <Icon sf="film" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saved" options={{ title: 'Saved' }}>
         <Icon sf="heart" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
