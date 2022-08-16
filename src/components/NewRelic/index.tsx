import React from 'react';
import { Select, Input } from 'native-base';

export const NewRelic = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Select
      selectedValue={observable.site}
      accessibilityLabel="Site"
      placeholder="Site"
      onValueChange={(value) => updateFieldWithValue('site', index, value)}
    >
      <Select.Item value={'eu.newrelic.com'} label='EU' />
      <Select.Item value={'newrelic.com'} label='OTHERS' />
    </Select>
    <Input
      accessibilityLabel="Api Key"
      placeholder="Api Key"
      
      type="password"
      value={observable.apiKey}
      onChangeText={(value) =>
        updateFieldWithValue('apiKey', index, value)
      }
    />
  </>
);
