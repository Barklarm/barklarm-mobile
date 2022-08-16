import React from 'react';
import { Input } from 'native-base';

export const GithubAction = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Input
      accessibilityLabel="owner"
      placeholder="owner"
      
      value={observable.owner}
      onChangeText={(value) =>
        updateFieldWithValue('owner', index, value)
      }
    />
    <Input
      accessibilityLabel="repo"
      placeholder="repo"
      
      value={observable.repo}
      onChangeText={(value) => updateFieldWithValue('repo', index, value)}
    />
    <Input
      accessibilityLabel="Workflow Name"
      placeholder="Workflow Name"
      
      value={observable.workflowId}
      onChangeText={(value) =>
        updateFieldWithValue('workflowId', index, value)
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
