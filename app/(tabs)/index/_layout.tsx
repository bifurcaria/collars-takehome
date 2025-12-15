import { Typography } from '@/constants/Typography';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function MoviesLayout() {
  return (
    <Stack screenOptions={{ 
      headerLargeTitle: true, 
      headerTransparent: Platform.select({ ios: true, default: false }),
      headerTitleStyle: {
        fontFamily: Typography.title,
        fontSize: Platform.select({ android: 42, default: undefined }),
      },
      headerLargeTitleStyle: {
        fontFamily: Typography.titleItalic,
      },
      headerShadowVisible: false,
    }}>
      <Stack.Screen name="index" options={{ title: 'Movies' }} />
    </Stack>
  );
}
 