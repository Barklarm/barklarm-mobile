import project from './package.json';

export default {
  name: 'barklarm',
  slug: 'barklarm',
  version: project.version,
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'myapp',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kanekotic.barklarm',
    buildNumber: project.version,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.kanekotic.barklarm',
    versionCode: project.version
      .split('.')
      .map((number) => Number(number))
      .reduce((total, value, index) => total + value * [10000, 100, 1][index], 0),
  },
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.png',
  },
  plugins: ['expo-router', 'expo-secure-store'],
  experiments: {
    typedRoutes: true,
  },
  "extra": {
    "eas": {
      "projectId": "6002db10-a1bc-4c3a-9332-f42d17dbd6a2"
    }
  }
};
