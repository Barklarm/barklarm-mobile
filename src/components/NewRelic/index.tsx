import React from 'react';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const NewRelic = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Picker
      selectedValue={observable.site}
      onValueChange={(value) => updateFieldWithValue('site', index, value)}
    >
      <Picker.Item value={'eu.newrelic.com'} label='EU' />
      <Picker.Item value={'newrelic.com'} label='OTHERS' />
    </Picker>
    <TextInput
      label="Api Key"
      secureTextEntry={true}
      value={observable.apiKey}
      onChangeText={(value) =>
        updateFieldWithValue('apiKey', index, value)
      }
    />
  </>
);
