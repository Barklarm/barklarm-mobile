import React from 'react';
import { Input } from 'native-base';

export const Sentry = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Input
      accessibilityLabel="organization"
      placeholder="organization"
      
      value={observable.organization}
      onChangeText={(value) =>
        updateFieldWithValue('organization', index, value)
      }
    />
    <Input
      accessibilityLabel="project"
      placeholder="project"
      
      value={observable.project}
      onChangeText={(value) =>
        updateFieldWithValue('project', index, value)
      }
    />
    <Input
      accessibilityLabel="authorization Token"
      placeholder="authorization Token"
      
      type="password"
      value={observable.authToken}
      onChangeText={(value) =>
        updateFieldWithValue('authToken', index, value)
      }
    />
  </>
);
