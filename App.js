import { LoginScreen, HomeScreen, WidjetScreen, ProfilScreen, ProfilScreenSecond, ProfilScreenThird, RegisterScreen, CompagnyCode, ChosePlanScreen, PaymentScreen, TwitterPage, AdminPage, MapScreen, ConvScreen } from './src/Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Login" component={ LoginScreen } />
      <Stack.Screen name="Register" component={ RegisterScreen } />
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="Widjet" component={ WidjetScreen } />
      <Stack.Screen name="Profile" component={ ProfilScreen } />
      <Stack.Screen name="Profilsecond" component={ ProfilScreenSecond } />
      <Stack.Screen name="ProfilThird" component={ ProfilScreenThird } />
      <Stack.Screen name="Code" component={ CompagnyCode } />
      <Stack.Screen name="Plan" component={ ChosePlanScreen } />
      <Stack.Screen name="Payment" component={ PaymentScreen } />
      <Stack.Screen name="Twitter" component={ TwitterPage } />
      <Stack.Screen name="Admin" component={ AdminPage } />
      <Stack.Screen name="Map" component={ MapScreen } />
      <Stack.Screen name="Conv" component={ ConvScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
