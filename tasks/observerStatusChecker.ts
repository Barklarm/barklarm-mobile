import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { ObserverManager } from '../domain/observers/ObserverManager';
import { Status } from '../types/Status';
import { State } from '../types/State';

export const observerStatusChecker = (observerManager: ObserverManager) => {
  const TASK_NAME = 'BARKLARM_BACKGROUND_TASK';
  let previousState: State[] = [];

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  TaskManager.defineTask(TASK_NAME, async () => {
    try {
      const states = await observerManager.getStates();
      states.forEach((state) => {
        if (
          state.status === Status.FAILURE &&
          previousState.find((localState) => localState.name === state.name)?.status !== Status.FAILURE
        ) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Barklarm',
              body: ` ${state.name} is Failing`,
            },
            trigger: {
              seconds: 1,
            },
          });
        }
      });
      previousState = states;
      return states ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (err) {
      return BackgroundFetch.BackgroundFetchResult.Failed;
    }
  });

  const Register = async () => {
    try {
      await BackgroundFetch.registerTaskAsync(TASK_NAME, {
        minimumInterval: 300,
        startOnBoot: true,
        stopOnTerminate: false,
      });
      previousState = [];
    } catch (err) {
      console.log('Task Register failed:', err);
    }
  };
  return { Register };
};
