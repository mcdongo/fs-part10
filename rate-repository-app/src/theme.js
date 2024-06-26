import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    backgroundColor: '#24292e',
    headerColor: 'white',
    fillerColor: '#d3d3d3',
    errorText: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),

  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;