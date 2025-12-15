import { Platform } from 'react-native';

export const Typography = {
  body: Platform.select({
    ios: 'System',
    android: 'InstrumentSans_400Regular',
    default: 'InstrumentSans_400Regular',
  }),
  bodyBold: Platform.select({
    ios: 'System', // Weight handled by fontWeight
    android: 'InstrumentSans_700Bold',
    default: 'InstrumentSans_700Bold',
  }),
  title: Platform.select({
    ios: 'System',
    android: 'DMSerifText_400Regular',
    default: 'DMSerifText_400Regular',
  }),
  titleItalic: Platform.select({
    ios: 'System',
    android: 'DMSerifText_400Regular_Italic',
    default: 'DMSerifText_400Regular_Italic',
  }),
};

