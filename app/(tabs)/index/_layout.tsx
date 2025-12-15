
import { Typography } from '@/constants/Typography';
import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function MoviesLayout() {
  return (
    <Stack screenOptions={{ 
      headerLargeTitle: true, 
      // (Large header title disappears when using ScrollView as content in Expo Native Tab screen)
      // This is an issue related to Apple's UIKit and not related to this Repository, as this can be reproduced without react-native-screens, on which Expo builds on.
      // See the related issue in https://github.com/expo/expo/issues/40717.
      // The current solution to this is to set headerTransparent: true and headerBlurEffect: "regular" on the Stack Screen options.
      headerTransparent: Platform.select({ ios: true, default: false }),
      headerTitleStyle: {
        fontFamily: Platform.select({ ios: 'System', android: Typography.title, default: Typography.title }),
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
 