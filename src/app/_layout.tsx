import { Tabs } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { ObserverManager } from '@/src/extensions/ObserverManager';
import { observerStatusChecker } from '@/src/tasks/observerStatusChecker';
import React from 'react';

export const ObserverContext = React.createContext<ObserverManager>({} as ObserverManager);

export default function RootLayout() {
  const observerManager = new ObserverManager();
  const statusChecker = observerStatusChecker(observerManager);
  statusChecker.Register();
  const colorScheme = useColorScheme();
  return (
    <PaperProvider>
      <ObserverContext.Provider value={observerManager}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'options' : 'options-outline'} color={color} />
              ),
            }}
          />
        </Tabs>
      </ObserverContext.Provider>
    </PaperProvider>
  );
}
