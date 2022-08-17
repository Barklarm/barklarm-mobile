import React, { useState } from 'react';
import { Card, Button, TextInput, FAB, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Select, Input , Heading, Column } from 'native-base';
import { observersComponentBuilderMap } from './helpers/observersComponentBuilderMap';
import { observersTitleBuilderMap } from './helpers/observersTitleBuilderMap';
import { ObserversParams } from '../../types/ObserversParams';

export const Observers = ({ observables, add, remove, update, save }: ObserversParams) => {
  
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: any) => setState({ open });
  const { open } = state;
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
        <Card key={`observable_${getTitle(observable)}`}>
          <Card.Title title={getTitle(observable)} />
          <Card.Content>
          <Picker
            selectedValue={observable.type}
            onValueChange={(value: any) => update('type', index, value)}
          >
            <Picker.Item value={'githubAction'} label='Github Action' />
            <Picker.Item value={'ccTray'} label='CCTray' />
            <Picker.Item value={'datadogMonitor'} label='Datadog Monitor' />
            <Picker.Item value={'sentry'} label='Sentry' />
            <Picker.Item value={'newRelic'} label='New Relic' />
          </Picker>
          {getComponent(observable, index, update)}
          <TextInput 
            label="alias"
            value={observable.alias}
            onChangeText={(value) => update('alias', index, value)}
          />
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => remove(index)}>
              Delete
            </Button>
          </Card.Actions>
        </Card>
      ))}
      <Portal>
      <FAB.Group
          open={open}
          icon={open ? 'cog' : 'plus'}
          actions={[
            { label: 'Add',icon: 'plus', onPress: () => console.log('Pressed add') },
            { label: 'Save',icon: 'content-save', onPress: () => console.log('Pressed remove') },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              setState({open: false})
            }
          }}
        />
        </Portal>
      <Column
        justifyContent="flex-end"
      >
        <Button onPress={() => save(observables)}>
          Save
        </Button>
        <Button onPress={() => add({ type: '' })}>
          Add
        </Button>
      </Column>
    </>
  );
};
