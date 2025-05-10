import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneScreen from './screens/phoneScreen';
import SmsScreen from "./screens/smsScreen";
import { Button, PermissionsAndroid } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const requestPermissions = async () => {
      if (Plataform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CALL_PHONE,
            PermissionsAndroid.PERMISSIONS.SEND_SMS,
          ]);

          if (
            granted['android.permission.CALL_PHONE'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissões condedidas');
          } else {
            console.log('Permissões negadas');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Phone">
        <Stack.Screen
          name="Phone"
          component={PhoneScreen}
          options={({ navigation }) => ({
            title: 'Ligação',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('SMS')}
                title="SMS"
              />
            ),
          })}
        />
        <Stack.Screen
          name="SMS"
          component={SmsScreen}
          options={({ navigation }) => ({
            title: 'Enviar SMS',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Phone')}
                title="Ligar"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}