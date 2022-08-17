import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { Card, Button, Appbar, Paragraph } from 'react-native-paper';
import { State } from "../../types/State";

export default function Home({observerManager}: any) {
  const [observablesState, setObservablesState] = useState([]);
  useEffect(() => {
    (async () => {
      observerManager.refershObservers()
      setObservablesState(await observerManager.getStates() as any)
      const MINUTE_MS = 10000;
      const interval = setInterval(async () => {
        setObservablesState(await observerManager.getStates() as any)
      }, MINUTE_MS);
      return () => clearInterval(interval);
    })()
    }, []);
  return (
    <>
    <Appbar.Header>
      <Appbar.Content title="Home" />
    </Appbar.Header>
      <ScrollView>
        {
          observablesState.map((state: State) =>(
            <Card key={`observable_${state.name}`}>
              <Card.Title title={state.name} />
              <Card.Content>
                <Paragraph>Status {state.status}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button>Link</Button>
              </Card.Actions>
            </Card>
          ))
        }
      </ScrollView >
    </>
  );
}