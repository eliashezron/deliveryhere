import React from 'react';
import {OrderDelivery, Home, Restaurant} from './screens'
import 'react-native-gesture-handler'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './navigation/tabs';
import { useFonts } from 'expo-font';
import RestaurantMenu from './screens/RestaurantMenu';
import { Provider } from 'react-redux';
import store, {rrfProps} from './store';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase'

export default function App() {
  const Stack = createNativeStackNavigator()

  const [loaded] = useFonts({
    "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

  })
  
  if(!loaded){
    return null;
  }
  
  return (
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <NavigationContainer>
        <SafeAreaProvider>
        <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        // tabBarShowLabel: false,
                        // tabBarStyle: [{
                        //     position: 'absolute',
                        //     left: 0,
                        //     bottom: 0,
                        //     right: 0,
                        //     borderTopWidth: 0,
                        //     backgroundColor: "transparent",
                        //     elevation: 0
                        // }]
                    }}
                    initialRouteName={'Home'}
                >
                    <Stack.Screen name="Home" component={Tabs} />
                    <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />
                    <Stack.Screen name="Restaurant" component={Restaurant} />
                    <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
                </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </ReactReduxFirebaseProvider>
  </Provider>
  );
}

;
