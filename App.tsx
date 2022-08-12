import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Notifications from 'expo-notifications'

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

export default function App() {
  RegisterBackgroundTask()
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
