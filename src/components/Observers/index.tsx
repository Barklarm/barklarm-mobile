import React, { useState } from 'react';
import { Card, Button, TextInput, FAB, Portal, useTheme } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { observersComponentBuilderMap } from '@/src/extensions/observersComponentBuilderMap';
import { observersTitleBuilderMap } from '@/src/extensions/observersTitleBuilderMap';
import { observersList } from '@/src/extensions/observersList';
import { ObserversParams } from '@/src/types/ObserversParams';

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
              {observersList.map(({ value, label }: any) => (
                <Picker.Item value={value} label={label} />
              ))}
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
