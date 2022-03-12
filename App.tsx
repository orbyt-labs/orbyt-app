import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecureKeychain from './src/core/secureKeychain';
import EntryScriptWeb3 from './src/core/entryScriptWeb3';
import { Load } from './src/screens/load';
const Stack = createNativeStackNavigator();

const App = () => {

  React.useEffect(() => {
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Loading"
          component={Load} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
