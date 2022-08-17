import React from 'react';
import { TextInput } from 'react-native-paper';

export const Sentry = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <TextInput
      label="organization"
      value={observable.organization}
      onChangeText={(value) =>
        updateFieldWithValue('organization', index, value)
      }
    />
    <TextInput
      label="project"
      value={observable.project}
      onChangeText={(value) =>
        updateFieldWithValue('project', index, value)
      }
    />
    <TextInput
      label="authorization Token"
      secureTextEntry={true}
      value={observable.authToken}
      onChangeText={(value) =>
        updateFieldWithValue('authToken', index, value)
      }
    />
  </>
);
