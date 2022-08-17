import React from "react";
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Notifications from 'expo-notifications'
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Home from "./src/pages/Home";
import Settings from "./src/pages/Settings";import { TouchableOpacity } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Header = ({ scene, previous, navigation }: any) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="twitter" size={40} />
        }
      />
    </Appbar.Header>
  );
};

const TASK_NAME = "BACKGROUND_TASK"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

TaskManager.defineTask(TASK_NAME, () => {
  try {
    // fetch data here...
    const receivedNewData = "Simulated fetch " + (Math.random()*1000)
    console.log("My task ", receivedNewData)
    Notifications.scheduleNotificationAsync(
        {
          content:{
            title: 'Barklarm',
            body: `My task ${receivedNewData}`
          },
          trigger: {
            seconds: 1
          }
        }
    );
    return receivedNewData
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData
  } catch (err) {
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

const RegisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 5, // seconds,
      startOnBoot: true,
      stopOnTerminate: false,
    })
    console.log("Task registered")
  } catch (err) {
    console.log("Task Register failed:", err)
  }
}

const Tab = createMaterialBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function App() {
  RegisterBackgroundTask()
  return ( 
    <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            shifting={true}
            sceneAnimationEnabled={false}>
            <Tab.Screen name="Home" component={Home} options={{ 
              tabBarIcon: 'home-account', 
              title:'Home',}}/>
            <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: 'cog', 
              title:'Configuration', }} />
          </Tab.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}