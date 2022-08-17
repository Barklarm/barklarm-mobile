import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { Card, Button, Appbar, Paragraph } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { GithubAction } from '../../domain/observers/GithubAction';
import { CCTray } from '../../domain/observers/CCTray';
import { DatadogMonitor } from '../../domain/observers/DatadogMonitor';
import { Sentry } from '../../domain/observers/Sentry';
import { NewRelic } from '../../domain/observers/NewRelic';
import { MapType } from '../../types/MapType';
import { Observer } from '../../types/Observer';
import { ObserverConfiguration } from '../../types/ObserverConfiguration';
import { State } from "../../types/State";

const ObserversBuildersMap: MapType<(config: any) => Observer> = {
  githubAction: (configuration: any) => new GithubAction(configuration as any),
  ccTray: (configuration: any) => new CCTray(configuration as any),
  datadogMonitor: (configuration: any) => new DatadogMonitor(configuration as any),
  sentry: (configuration: any) => new Sentry(configuration as any),
  newRelic: (configuration: any) => new NewRelic(configuration as any),
};

export default function Home() {
  const [observablesState, setObservablesState] = useState([]);
  useEffect(() => {
    (async () => {
      const result: string = await SecureStore.getItemAsync('observables') || '[]';
      const observableConfiguration = JSON.parse(result)
      const observablesLocal = observableConfiguration.map(
        (configuration: ObserverConfiguration) => {
          try {
            return ObserversBuildersMap[configuration.type](configuration);
          } catch (error) {
            console.error(error);
          }
        }
      ).filter((observable?: Observer) => observable !== undefined);
      const statusLocal = await Promise.all(observablesLocal.map((observable: any) => observable.getState()));
      setObservablesState(statusLocal as any)
      const MINUTE_MS = 10000;
      const interval = setInterval(async () => {
        const statusLocal = await Promise.all(observablesLocal.map((observable: any) => observable.getState()));
        setObservablesState(statusLocal as any)
      }, MINUTE_MS);
      return () => clearInterval(interval);
    })()
    }, []);
  return (
    <>
    <Appbar.Header>
      <Appbar.Content title="Home" />
    </Appbar.Header>
      <ScrollView>
        {
          observablesState.map((state: State) =>(
            <Card key={`observable_${state.name}`}>
              <Card.Title title={state.name} />
              <Card.Content>
                <Paragraph>Status {state.status}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Link</Button>
              </Card.Actions>
            </Card>
          ))
        }
      </ScrollView >
    </>
  );
}