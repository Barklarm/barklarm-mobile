import project from './package.json';

export default {
  name: 'barklarm',
  slug: 'barklarm',
  version: project.version,
  orientation: 'portrait',
  icon: './src/assets/images/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'myapp',
  splash: {
    image: './src/assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.barklarm.barklarm',
    buildNumber: project.version,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './src/assets/images/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.barklarm.barklarm',
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
  updates: {
    url: 'https://u.expo.dev/6002db10-a1bc-4c3a-9332-f42d17dbd6a2',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  extra: {
    eas: {
      projectId: '6002db10-a1bc-4c3a-9332-f42d17dbd6a2',
    },
  },
};
