import { Typography } from '@/constants/Typography';
import { Stack } from 'expo-router';
import React from 'react';

export default function SearchLayout() {
  return (
    <Stack screenOptions={{
      headerTitleStyle: {
        fontFamily: Typography.title,
      },
    }}>
      <Stack.Screen name="index" options={{ title: 'Search' }} />
    </Stack>
  );
}
