import { GithubAction } from './GithubAction';
import { CCTray } from './CCTray';
import { Observer } from '../../types/Observer';
import { ObserverConfiguration } from '../../types/ObserverConfiguration';
import { DatadogMonitor } from './DatadogMonitor';
import { MapType } from '../../types/MapType';
import { Sentry } from './Sentry';
import { NewRelic } from './NewRelic';

export class ObserverManager {
  private observers: Observer[];
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

  public async refershObservers(observableConfigurations: ObserverConfiguration[]) {
    this.observers = observableConfigurations.map(
      (configuration: ObserverConfiguration) => {
        try {
          return this.ObserversBuildersMap[configuration.type](configuration);
        } catch (error) {
          console.error(error);
        }
      }
    ).filter((observable?: Observer) => observable !== undefined);
  }
}
