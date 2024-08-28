import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';

export const Bitbucket = ({ observable, index, updateFieldWithValue }: any) => {
  return (
    <>
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Workspace'}
        value={observable.workspace}
        onChangeText={(value) => updateFieldWithValue('workspace', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Repository'}
        value={observable.repo}
        onChangeText={(value) => updateFieldWithValue('repo', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Branch'}
        value={observable.branch}
        onChangeText={(value) => updateFieldWithValue('branch', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Authorization Token'}
        secureTextEntry={true}
        value={observable.authToken}
        onChangeText={(value) => updateFieldWithValue('authToken', index, value)}
      />
    </>
  );
};
