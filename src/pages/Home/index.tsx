import React, { useState, useEffect } from "react";
import { ScrollView, Image } from 'react-native';
import { Card, Appbar } from 'react-native-paper';
import { State } from "../../types/State";
import { Status } from "../../types/Status";

export default function Home({observerManager}: any) {
  const [observablesState, setObservablesState] = useState([]);
  const imageSelector = (status: Status) => {
    switch (status) {
      case Status.SUCCESS:
        return require('../../../assets/ok_icon_big.png')
      case Status.CHECKING:
        return require('../../../assets/running_icon_big.png')
      case Status.NA:
        return require('../../../assets/na_icon_big.png')
      case Status.FAILURE:
        return require('../../../assets/fail_icon_big.png')
    }
    
  }
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
          observablesState.map((state: State, index: number) =>(
            <Card 
              key={`observable_${index}_${state.name}`} 
              style={{
                marginVertical: 5
            }}>
              <Card.Title
                title={state.name}
                subtitle={Status.toString(state.status)}
                titleStyle={{
                  fontWeight: 'bold',
                  fontSize: 20
                }}
                left={(props) => <Image style={{ width: 30, height: 30 }} {...props} source={imageSelector(state.status)}  />}
              />
            </Card>
          ))
        }
      </ScrollView >
    </>
  );
}