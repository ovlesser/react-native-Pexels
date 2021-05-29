/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import Detail from './detail/Detail';
import Home from './home/Home';
import reducer from './redux/Reducer';

export const store = createStore(reducer);
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={'Home'}>
            <Stack.Screen
              name={'Home'}
              component={Home}
              options={{title: 'Overview'}}
            />
            <Stack.Screen name={'Detail'} component={Detail} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
};
export default App;
