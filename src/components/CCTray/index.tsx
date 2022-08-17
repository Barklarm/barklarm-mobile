import React from 'react';
import { TextInput } from 'react-native-paper';

export const CCTray = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <TextInput
      label="url"
      value={observable.url}
      onChangeText={(value: any) => updateFieldWithValue('url', index, value)}
    />
    <TextInput
      label="Project Name"
      value={observable.name}
      onChangeText={(value: any) => updateFieldWithValue('name', index, value)}
    />
  </>
);
