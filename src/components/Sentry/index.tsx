import React from 'react';
import { TextInput } from 'react-native-paper';

export const Sentry = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="organization"
      value={observable.organization}
      onChangeText={(value) => updateFieldWithValue('organization', index, value)}
    />
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="project"
      value={observable.project}
      onChangeText={(value) => updateFieldWithValue('project', index, value)}
    />
    <TextInput
      style={{
        marginBottom: 5,
      }}
      label="authorization Token"
      secureTextEntry={true}
      value={observable.authToken}
      onChangeText={(value) => updateFieldWithValue('authToken', index, value)}
    />
  </>
);
