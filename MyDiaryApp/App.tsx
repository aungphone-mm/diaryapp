import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { auth } from './src/config/firebase';

import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import PasswordReset from './src/components/PasswordReset';
import NewEntry from './src/components/NewEntry';
import EntryList from './src/components/EntryList';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  PasswordReset: undefined;
  Home: undefined;
  NewEntry: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Stack = createStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.newEntryButton}
        onPress={() => navigation.navigate('NewEntry')}
      >
        <Text style={styles.buttonText}>+ New Entry</Text>
      </TouchableOpacity>
      <EntryList />
    </View>
  );
}

function App(): React.JSX.Element {
  const [user, setUser] = useState<any>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'reset'>('login');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: 'My Diary',
                  headerRight: () => (
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                      <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="NewEntry"
                component={NewEntry}
                options={{ title: 'New Entry' }}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => (
                  <Login
                    onSignUpPress={() => setAuthMode('signup')}
                    onPasswordResetPress={() => setAuthMode('reset')}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="SignUp" options={{ headerShown: false }}>
                {() => <SignUp onBackToLogin={() => setAuthMode('login')} />}
              </Stack.Screen>
              <Stack.Screen name="PasswordReset" options={{ headerShown: false }}>
                {() => <PasswordReset onBackToLogin={() => setAuthMode('login')} />}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newEntryButton: {
    backgroundColor: '#007bff',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginRight: 15,
  },
  logoutText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default App;
