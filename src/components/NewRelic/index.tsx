import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

export const NewRelic = ({ observable, index, updateFieldWithValue }: any) => {
  const { colors } = useTheme();
  return <>
    <Picker
      style={{ 
        backgroundColor: colors.surfaceVariant,
        color: colors.secondary,
        marginBottom: 5,
      }}
      selectedValue={observable.site}
      onValueChange={(value) => updateFieldWithValue('site', index, value)}
    >
      <Picker.Item value={'eu.newrelic.com'} label='EU' />
      <Picker.Item value={'newrelic.com'} label='OTHERS' />
    </Picker>
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="Api Key"
      secureTextEntry={true}
      value={observable.apiKey}
      onChangeText={(value) =>
        updateFieldWithValue('apiKey', index, value)
      }
    />
  </>
}
