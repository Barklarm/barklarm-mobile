import { GithubAction } from '@/src/extensions/github/observer';
import { CCTray } from '@/src/extensions/cctray/observer';
import { Observer } from '@/src/types/Observer';
import { ObserverConfiguration } from '@/src/types/ObserverConfiguration';
import { DatadogMonitor } from '@/src/extensions/datadog/observer';
import { MapType } from '@/src/types/MapType';
import { Sentry } from '@/src/extensions/sentry/observer';
import { NewRelic } from '@/src/extensions/newRelic/observer';

import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export class ObserverManager {
  private observers: Observer[] = [];
  private readonly ObserversBuildersMap: MapType<(config: any) => Observer> = {
    githubAction: (configuration: any) => new GithubAction(configuration as any),
    ccTray: (configuration: any) => new CCTray(configuration as any),
    datadogMonitor: (configuration: any) => new DatadogMonitor(configuration as any),
    sentry: (configuration: any) => new Sentry(configuration as any),
    newRelic: (configuration: any) => new NewRelic(configuration as any),
  };

  public async getStates() {
    return await Promise.all(this.observers.map((observer) => observer.getState()));
  }

  public async refershObservers() {
    let result: string;
    if (Platform.OS === 'web') {
      result = (await window.localStorage.getItem('observables')) || '[]';
    } else {
      // mobile
      result = (await SecureStore.getItemAsync('observables')) || '[]';
    }
    const observableConfiguration = JSON.parse(result);
    this.observers = observableConfiguration
      .map((configuration: ObserverConfiguration) => {
        try {
          return this.ObserversBuildersMap[configuration.type](configuration);
        } catch (error) {
          console.error(error);
        }
      })
      .filter((observable?: Observer) => observable !== undefined) as any;
  }
}
