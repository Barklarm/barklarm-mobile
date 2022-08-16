import React from 'react';
import { Select, Input , Heading, Column, Button } from 'native-base';
import { observersComponentBuilderMap } from './helpers/observersComponentBuilderMap';
import { observersTitleBuilderMap } from './helpers/observersTitleBuilderMap';
import { ObserversParams } from '../../types/ObserversParams';

export const Observers = ({ observables, add, remove, update, save }: ObserversParams) => {
  const getComponent = (observable: any, index: number, updateFieldWithValue: any): any => {
    try {
      return observersComponentBuilderMap[observable.type](observable, index, updateFieldWithValue);
    } catch (_) {
      return <></>;
    }
  };
  const getTitle = (observable: any): string => {
    try {
      return observersTitleBuilderMap[observable.type](observable);
    } catch (_) {
      return 'Unkown';
    }
  };
  return (
    <>
      {observables.map((observable: any, index: number) => (
        <Column>
          <Heading>{getTitle(observable)}</Heading>
          <Select
            selectedValue={observable.type}
            accessibilityLabel="Observer Type"
            placeholder="Observer Type"
            onValueChange={(value) => update('type', index, value)}
          >
            <Select.Item value={'githubAction'} label='Github Action' />
            <Select.Item value={'ccTray'} label='CCTray' />
            <Select.Item value={'datadogMonitor'} label='Datadog Monitor' />
            <Select.Item value={'sentry'} label='Sentry' />
            <Select.Item value={'newRelic'} label='New Relic' />
          </Select>
          {getComponent(observable, index, update)}
          <Input 
            accessibilityLabel="alias"
            placeholder="alias"
            
            value={observable.alias}
            onChangeText={(value) => update('alias', index, value)}
          />
          <Column direction="row" justifyContent="flex-end">
            <Button variant="contained" onPress={() => remove(index)}>
              Delete
            </Button>
          </Column>
        </Column>
      ))}
      <Column
        justifyContent="flex-end"
      >
        <Button variant="contained" onPress={() => save(observables)}>
          Save
        </Button>
        <Button variant="contained" onPress={() => add({ type: '' })}>
          Add
        </Button>
      </Column>
    </>
  );
};
