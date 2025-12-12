import { Stack } from 'expo-router';
import React from 'react';

export default function MoviesLayout() {
  return (
    <Stack screenOptions={{ headerLargeTitle: true, headerTransparent: true}}>
      <Stack.Screen name="index" options={{ title: 'Movies' }} />
    </Stack>
  );
}
 