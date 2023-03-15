import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LandingScreen from '../screens/LandingScreen';
import UserMapScreen from '../screens/UserMapScreen';
import MapScreen from '../screens/MapScreen';

import Auth from './AuthStack';

import {CredentialsContext} from '../components/CredentialsContext';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <CredentialsContext.Consumer>
      {({storedCredentials}) => (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {storedCredentials ? (
              <>
                <Stack.Screen name="UserMap" component={UserMapScreen} />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Landing"
                  component={LandingScreen}
                  options={{animation: 'slide_from_bottom'}}
                />

                <Stack.Screen
                  name="Auth"
                  component={Auth}
                  options={{
                    animation: 'slide_from_bottom',
                  }}
                />

                <Stack.Screen
                  name="Map"
                  component={MapScreen}
                  options={{
                    animation: 'slide_from_bottom',
                  }}
                />

                {!storedCredentials && (
                  <Stack.Screen
                    name="UserMap"
                    component={UserMapScreen}
                    options={{animation: 'slide_from_right'}}
                  />
                )}
              </>
            )}
          </Stack.Navigator>

          <StatusBar backgroundColor="#000" barStyle="light-content" />
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
}

export default RootStack;
