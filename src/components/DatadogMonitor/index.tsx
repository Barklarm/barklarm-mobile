import React from 'react';
import { Select, Input } from 'native-base';

export const DatadogMonitor = ({ observable, index, updateFieldWithValue }: any) => (
  <>
    <Select
      selectedValue={observable.site}
      accessibilityLabel="Site"
      placeholder="Site"
      onValueChange={(value) => updateFieldWithValue('site', index, value)}
    >
      <Select.Item value={'datadoghq.eu'} label='EU'/>
      <Select.Item value={'datadoghq.com'} label='US'/>
      <Select.Item value={'us3.datadoghq.com'} label='US3'/>
      <Select.Item value={'us5.datadoghq.com'} label='US5'/>
      <Select.Item value={'dddog-gov.com'} label='US1-FED'/>
    </Select>
    <Input
      accessibilityLabel="Monitor ID"
      placeholder="Monitor ID"
      
      value={observable.monitorId}
      onChangeText={(value) =>
        updateFieldWithValue('monitorId', index, value)
      }
    />
    <Input
      accessibilityLabel="Api Key"
      placeholder="Api Key"
      
      type="password"
      value={observable.apiKey}
      onChangeText={(value) =>
        updateFieldWithValue('apiKey', index, value)
      }
    />
    <Input
      accessibilityLabel="App Key"
      placeholder="App Key"
      
      type="password"
      value={observable.appKey}
      onChangeText={(value) =>
        updateFieldWithValue('appKey', index, value)
      }
    />
  </>
);
