import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const Opsgenie = ({ observable, index, updateFieldWithValue }: any) => {
  const { colors } = useTheme();
  return (
    <>
      <Picker
        style={{
          backgroundColor: colors.surfaceVariant,
          color: colors.secondary,
          marginBottom: 5,
        }}
        selectedValue={observable.host}
        onValueChange={(value) => updateFieldWithValue('host', index, value)}
      >
        <Picker.Item value={'eu.opsgenie.com'} label="EU" />
        <Picker.Item value={'opsgenie.com'} label="Others" />
      </Picker>
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Identifier'}
        value={observable.identifier}
        onChangeText={(value) => updateFieldWithValue('identifier', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'API Key'}
        secureTextEntry={true}
        value={observable.apiKey}
        onChangeText={(value) => updateFieldWithValue('apiKey', index, value)}
      />
    </>
  );
};
