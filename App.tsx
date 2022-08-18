import React from "react";
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observerStatusChecker } from "./src/tasks/observerStatusChecker";
import {
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import Home from "./src/pages/Home";
import Settings from "./src/pages/Settings";
import { ObserverManager } from "./src/domain/observers/ObserverManager";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator()

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

const observerManager = new ObserverManager()
const statusChecker = observerStatusChecker(observerManager)
statusChecker.Register()
NavigationDarkTheme.colors = {...NavigationDarkTheme.colors, ...PaperDarkTheme.colors}

export default function App() {
  return ( 
    <PaperProvider theme={CombinedDarkTheme}>
        <NavigationContainer theme={CombinedDarkTheme}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Settings') {
                  iconName = 'gear';
                }
                return <AwesomeIcon name={iconName} size={size} color={color} />;
              }
            })}>
            <Tab.Screen 
              name="Home">
            {(props) => <Home {...props} observerManager={observerManager} />}
            </Tab.Screen>
            <Tab.Screen 
              name="Settings">
                {(props) => <Settings {...props} observerManager={observerManager} />}
              </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}

