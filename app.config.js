import project from "./package.json";

export default {
  "name": "barklarm",
  "slug": "barklarm",
  "version": project.version,
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "userInterfaceStyle": "light",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": "com.kanekotic.barklarm",
    "buildNumber": project.version
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    },
    "package": "com.kanekotic.barklarm",
    "versionCode": project.version.split(".").map(number =>Number(number)).reduce((total, value, index) => total + (value * [10000,100,1][index]) , 0)
  },
  "web": {
    "favicon": "./assets/favicon.png"
  }
}
