import React from "react";
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Notifications from 'expo-notifications'
import { NativeBaseProvider, Box } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./src/pages/Home";
import Settings from "./src/pages/Settings";

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

const Tab = createBottomTabNavigator();

export default function App() {
  RegisterBackgroundTask()
  return ( 
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
  );
}