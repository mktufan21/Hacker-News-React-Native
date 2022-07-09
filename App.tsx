import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import {QueryClient, QueryClientProvider} from 'react-query';
import HeadLineScreen from './src/HeadLineScreen';
import CommentScreen from './src/CommentScreen';
import {ROUTE_NAMES} from './src/Utils/constants';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={ROUTE_NAMES.HEADLINE_PAGE}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center'
          }}>
          <Stack.Screen
            name={ROUTE_NAMES.HEADLINE_PAGE}
            component={HeadLineScreen}
          />
          <Stack.Screen
            name={ROUTE_NAMES.COMMENT_SCREEN}
            component={CommentScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
