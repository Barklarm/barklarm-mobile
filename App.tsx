import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { observerStatusChecker } from "./src/tasks/observerStatusChecker";

import Home from "./src/pages/Home";
import Settings from "./src/pages/Settings";
import { ObserverManager } from "./src/domain/observers/ObserverManager";

const Tab = createMaterialBottomTabNavigator();


export default function App() {
  const observerManager = new ObserverManager()
  const statusChecker = observerStatusChecker(observerManager)
  statusChecker.Register()
  return ( 
    <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Feed"
            shifting={true}
            sceneAnimationEnabled={false}>
            <Tab.Screen 
              name="Home" 
              options={{ 
                tabBarIcon: 'home-account', 
                title:'Home',}
              }>
            {(props) => <Home {...props} observerManager={observerManager} />}
            </Tab.Screen>
            <Tab.Screen 
              name="Settings"
              options={{ 
                tabBarIcon: 'cog', 
                title:'Configuration', 
              }} >
                {(props) => <Settings {...props} observerManager={observerManager} />}
              </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}

