import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Portal } from 'react-native-paper';
import { Observers as ObserversComponent } from '../../components/Observers';
import { mutations } from './helpers/mutations';
import * as SecureStore from 'expo-secure-store';

export default function Settings({ observerManager }: any) {
  const [observables, setObservables] = useState([]);
  const { addObserver, removeObserver, updateObserver } = mutations(observables, setObservables);
  useEffect(() => {
    (async () => {
      const result: string = (await SecureStore.getItemAsync('observables')) || '[]';
      setObservables(JSON.parse(result));
    })();
  }, []);
  return (
    <Portal.Host>
      <ScrollView>
        <ObserversComponent
          observables={observables}
          add={addObserver}
          update={updateObserver}
          remove={removeObserver}
          save={async () => {
            await SecureStore.setItemAsync('observables', JSON.stringify(observables));
            await observerManager.refershObservers();
          }}
        />
      </ScrollView>
    </Portal.Host>
  );
}
