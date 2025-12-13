import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function SavedLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerTransparent: Platform.select({ ios: true, default: false }), headerBlurEffect: 'regular' }}>
      <Stack.Screen name="index" options={{ title: 'Saved' }} />
    </Stack>
  );
}
