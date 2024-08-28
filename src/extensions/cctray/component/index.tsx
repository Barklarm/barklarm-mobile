import React from 'react';
import { TextInput } from 'react-native-paper';

export const CCTray = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="url"
      value={observable.url}
      onChangeText={(value: any) => updateFieldWithValue('url', index, value)}
    />
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="Project Name"
      value={observable.name}
      onChangeText={(value: any) => updateFieldWithValue('name', index, value)}
    />
  </>
);
