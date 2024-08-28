import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const DatadogMonitor = ({ observable, index, updateFieldWithValue }: any) => {
  const { colors } = useTheme();
  return (
    <>
      <Picker
        style={{
          backgroundColor: colors.surfaceVariant,
          color: colors.secondary,
          marginBottom: 5,
        }}
        selectedValue={observable.site}
        onValueChange={(value) => updateFieldWithValue('site', index, value)}
      >
        <Picker.Item value={'datadoghq.eu'} label="EU" />
        <Picker.Item value={'datadoghq.com'} label="US" />
        <Picker.Item value={'us3.datadoghq.com'} label="US3" />
        <Picker.Item value={'us5.datadoghq.com'} label="US5" />
        <Picker.Item value={'dddog-gov.com'} label="US1-FED" />
      </Picker>
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label="Monitor ID"
        value={observable.monitorId}
        onChangeText={(value) => updateFieldWithValue('monitorId', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label="Api Key"
        secureTextEntry={true}
        value={observable.apiKey}
        onChangeText={(value) => updateFieldWithValue('apiKey', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label="App Key"
        secureTextEntry={true}
        value={observable.appKey}
        onChangeText={(value) => updateFieldWithValue('appKey', index, value)}
      />
    </>
  );
};
