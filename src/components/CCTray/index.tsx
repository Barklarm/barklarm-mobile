import React from 'react';
import { Input } from 'native-base';

export const CCTray = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Input
      accessibilityLabel="url"
      placeholder="url"
      
      value={observable.url}
      onChangeText={(value) => updateFieldWithValue('url', index, value)}
    />
    <Input
      accessibilityLabel="Project Name"
      placeholder="Project Name"
      
      value={observable.name}
      onChangeText={(value) => updateFieldWithValue('name', index, value)}
    />
  </>
);
