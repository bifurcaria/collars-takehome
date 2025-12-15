import { Platform } from 'react-native';

export const Typography = {
  body: Platform.select({
    ios: 'System',
    android: 'InstrumentSans_400Regular',
    default: 'InstrumentSans_400Regular',
  }),
  bodyBold: Platform.select({
    ios: 'System', // Weight handled by fontWeight
    android: 'InstrumentSans_600SemiBold',
    default: 'InstrumentSans_600SemiBold',
  }),
  title: Platform.select({
    ios: 'DMSerifText_400Regular',
    android: 'DMSerifText_400Regular',
    default: 'DMSerifText_400Regular',
  }),
  titleItalic: Platform.select({
    ios: 'DMSerifText_400Regular',
    android: 'DMSerifText_400Regular_Italic',
    default: 'DMSerifText_400Regular_Italic',
  }),
};

