import React, { useState } from 'react';
import { NativeBaseProvider, Box } from "native-base";
import { Observers as ObserversComponent } from '../../components/Observers';
import { mutations } from './helpers/mutations';

export default function Settings(){
  const [observables, setObservables] = useState([]);
  const { addObserver, removeObserver, updateObserver } = mutations(observables, setObservables);
  return (
    <NativeBaseProvider>
          <ObserversComponent
            observables={observables}
            add={addObserver}
            update={updateObserver}
            remove={removeObserver}
            save={() => console.log('save')}
          />
    </NativeBaseProvider>
  );
};
