import React from 'react';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const DatadogMonitor = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Picker
      selectedValue={observable.site}
      onValueChange={(value) => updateFieldWithValue('site', index, value)}
    >
      <Picker.Item value={'datadoghq.eu'} label='EU'/>
      <Picker.Item value={'datadoghq.com'} label='US'/>
      <Picker.Item value={'us3.datadoghq.com'} label='US3'/>
      <Picker.Item value={'us5.datadoghq.com'} label='US5'/>
      <Picker.Item value={'dddog-gov.com'} label='US1-FED'/>
    </Picker>
    <TextInput
      label="Monitor ID"
      value={observable.monitorId}
      onChangeText={(value) =>
        updateFieldWithValue('monitorId', index, value)
      }
    />
    <TextInput
      label="Api Key"
      secureTextEntry={true}
      value={observable.apiKey}
      onChangeText={(value) =>
        updateFieldWithValue('apiKey', index, value)
      }
    />
    <TextInput
      label="App Key"
      secureTextEntry={true}
      value={observable.appKey}
      onChangeText={(value) =>
        updateFieldWithValue('appKey', index, value)
      }
    />
  </>
);
