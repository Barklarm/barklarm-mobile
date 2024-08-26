import React, { useState, useEffect, useContext } from 'react';
import { Platform, ScrollView } from 'react-native';
import { Portal } from 'react-native-paper';
import { Observers as ObserversComponent } from '../../components/Observers';
import { mutations } from './helpers/mutations';
import * as SecureStore from 'expo-secure-store';
import { ObserverContext } from '../_layout';
import { ObserverManager } from '@/domain/observers/ObserverManager';

export default function Settings() {
  const observerManager = useContext(ObserverContext) as ObserverManager;
  const [observables, setObservables] = useState([]);
  const { addObserver, removeObserver, updateObserver } = mutations(observables, setObservables);
  useEffect(() => {
    (async () => {
      let result: string;
      if (Platform.OS === 'web') {
        result = (await window.localStorage.getItem('observables')) || '[]';
      } else {
        // mobile
        result = (await SecureStore.getItemAsync('observables')) || '[]';
      }
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
            if (Platform.OS === 'web') {
              window.localStorage.setItem('observables', JSON.stringify(observables));
            } else {
              // mobile
              await SecureStore.setItemAsync('observables', JSON.stringify(observables));
            }
            await observerManager.refershObservers();
          }}
        />
      </ScrollView>
    </Portal.Host>
  );
}
