import React, { useState } from 'react';
import { Card, Button, TextInput, FAB, Portal, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { observersComponentBuilderMap } from './helpers/observersComponentBuilderMap';
import { observersTitleBuilderMap } from './helpers/observersTitleBuilderMap';
import { ObserversParams } from '../../../types/ObserversParams';

export const Observers = ({ observables, add, remove, update, save }: ObserversParams) => {
  const { colors } = useTheme();
  const [state, setState] = useState({ open: false });

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
        <Card
          key={`observable_${index}`}
          style={{
            marginVertical: 5,
          }}
        >
          <Card.Title
            title={getTitle(observable)}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 20,
            }}
          />
          <Card.Content>
            <Picker
              style={{
                backgroundColor: colors.surfaceVariant,
                color: colors.secondary,
                marginBottom: 5,
              }}
              selectedValue={observable.type}
              onValueChange={(value: any) => update('type', index, value)}
            >
              <Picker.Item value={'githubAction'} label="Github Action" />
              <Picker.Item value={'ccTray'} label="CCTray" />
              <Picker.Item value={'datadogMonitor'} label="Datadog Monitor" />
              <Picker.Item value={'sentry'} label="Sentry" />
              <Picker.Item value={'newRelic'} label="New Relic" />
            </Picker>
            {getComponent(observable, index, update)}
            <TextInput
              style={{
                marginBottom: 5,
              }}
              label="alias"
              value={observable.alias}
              onChangeText={(value) => update('alias', index, value)}
            />
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => remove(index)}>Delete</Button>
          </Card.Actions>
        </Card>
      ))}
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'cog' : 'plus'}
          actions={[
            { label: 'Add', icon: 'plus', onPress: () => add({ type: '' }) },
            { label: 'Save', icon: 'content-save', onPress: () => save(observables) },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              setState({ open: false });
            }
          }}
        />
      </Portal>
    </>
  );
};
