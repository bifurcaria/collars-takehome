import { Stack } from 'expo-router';
import React from 'react';

export default function SavedLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerTransparent: true, headerBlurEffect: 'none' }}>
      <Stack.Screen name="index" options={{ title: 'Saved' }} />
    </Stack>
  );
}
