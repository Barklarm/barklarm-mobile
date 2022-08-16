import React, { useState, useEffect } from 'react';
import { NativeBaseProvider } from "native-base";
import { Observers as ObserversComponent } from '../../components/Observers';
import { mutations } from './helpers/mutations';
import * as SecureStore from 'expo-secure-store';

export default function Settings(){
  const [observables, setObservables] = useState([]);
  const { addObserver, removeObserver, updateObserver } = mutations(observables, setObservables);
  useEffect(() => {
    (async () => {
      const result: string = await SecureStore.getItemAsync('observables') || '[]';
      setObservables(JSON.parse(result))
    })()
    }, []);
  return (
    <NativeBaseProvider>
          <ObserversComponent
            observables={observables}
            add={addObserver}
            update={updateObserver}
            remove={removeObserver}
            save={() => SecureStore.setItemAsync('observables', JSON.stringify(observables))}
          />
    </NativeBaseProvider>
  );
};
