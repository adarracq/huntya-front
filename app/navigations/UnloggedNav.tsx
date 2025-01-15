import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OnBoardingScreen from '../screens/unlogged/OnBoardingScreen';
import LoginScreen from '../screens/unlogged/LoginScreen';
import EmailInputScreen from '../screens/unlogged/EmailInputScreen';
import CheckEmailCodeScreen from '../screens/unlogged/CheckEmailCodeScreen';
import ChooseTypeScreen from '../screens/unlogged/ChooseTypeScreen';
import SetDetailsScreen from '../screens/unlogged/SetDetailsScreen';
import User from '../models/User';
import SetLanguagesScreen from '../screens/unlogged/SetLanguagesScreen';


export type NavParams = {
    OnBoarding: undefined;
    Login: undefined;
    EmailInput: undefined;
    CheckEmailCode: { email: string, loginOrSignup: string };
    ChooseType: { user: User };
    SetDetails: { user: User };
    SetLanguages: { user: User };
};

const Stack = createStackNavigator<NavParams>();

export default function UnLoggedNav() {


    return (
        <Stack.Navigator initialRouteName={"OnBoarding"}>
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EmailInput" component={EmailInputScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CheckEmailCode" component={CheckEmailCodeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChooseType" component={ChooseTypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetDetails" component={SetDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetLanguages" component={SetLanguagesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}