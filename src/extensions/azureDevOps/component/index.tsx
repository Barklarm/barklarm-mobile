import React from 'react';
import { TextInput, useTheme } from 'react-native-paper';

export const AzureDevOps = ({ observable, index, updateFieldWithValue }: any) => {
  const { colors } = useTheme();
  return (
    <>
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Organization Url'}
        value={observable.orgUrl}
        onChangeText={(value) => updateFieldWithValue('orgUrl', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Project'}
        value={observable.project}
        onChangeText={(value) => updateFieldWithValue('project', index, value)}
      />
      <TextInput
        style={{
          marginBottom: 5,
        }}
        label={'Pipeline ID'}
        value={observable.pipelineId}
        onChangeText={(value) => updateFieldWithValue('pipelineId', index, value)}
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
