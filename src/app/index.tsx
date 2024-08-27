import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { State } from '@/src/types/State';
import { Status } from '@/src/types/Status';
import { ObserverContext } from '@/src/app/_layout';
import { ObserverManager } from '@/src/domain/observers/ObserverManager';

export default function Home() {
  const observerManager = useContext(ObserverContext) as ObserverManager;
  const [observablesState, setObservablesState] = useState([]);
  const imageSelector = (status: Status) => {
    switch (status) {
      case Status.SUCCESS:
        return require('@/src/assets/images/ok_icon_big.png');
      case Status.CHECKING:
        return require('@/src/assets/images/running_icon_big.png');
      case Status.NA:
        return require('@/src/assets/images/na_icon_big.png');
      case Status.FAILURE:
        return require('@/src/assets/images/fail_icon_big.png');
    }
  };
  useEffect(() => {
    (async () => {
      await observerManager.refershObservers();
      setObservablesState((await observerManager.getStates()) as any);
      const MINUTES_MS = 300000;
      const interval = setInterval(async () => {
        setObservablesState((await observerManager.getStates()) as any);
      }, MINUTES_MS);
      return () => clearInterval(interval);
    })();
  }, []);
  return (
    <>
      <ScrollView>
        {observablesState.map((state: State, index: number) => (
          <Card
            key={`observable_${index}_${state.name}`}
            style={{
              marginVertical: 5,
            }}
          >
            <Card.Title
              title={state.name}
              subtitle={Status.toString(state.status)}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 20,
              }}
              left={(props) => (
                <Image style={{ width: 30, height: 30 }} {...props} source={imageSelector(state.status)} />
              )}
            />
          </Card>
        ))}
      </ScrollView>
    </>
  );
}
