import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthGuard from '@src/auth/AuthGuard';
import Dashboard from '@src/screens/Dashboard/Dashboard';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
const Stack = createNativeStackNavigator();




function App(): JSX.Element {
  return (
    <AlertNotificationRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>

          <AuthGuard>
            <Stack.Navigator initialRouteName='dashboard'>
              <Stack.Screen
                options={{
                  headerShown: false,
                }}
                name="dashboard"
                component={Dashboard}
              />
            </Stack.Navigator>
          </AuthGuard>

        </NavigationContainer>
      </GestureHandlerRootView>
    </AlertNotificationRoot>
  );
}


export default App;