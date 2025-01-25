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
import AccountCreatedScreen from '../screens/unlogged/AccountCreatedScreen';
import SetNetworkScreen from '../screens/unlogged/SetNetworkScreen';
import PaiementScreen from '../screens/unlogged/PaiementScreen';
import SelectPlanScreen from '../screens/unlogged/SelectPlanScreen';
import SetExperienceScreen from '../screens/unlogged/SetExperienceScreen';
import SetStatusScreen from '../screens/unlogged/SetStatusScreen';
import SelectZoneOnBoardingScreen from '../screens/zoneSelection/SelectZoneOnBoardingScreen';
import SelectZoneMapScreen from '../screens/zoneSelection/SelectZoneMapScreen';


export type NavParams = {
    OnBoarding: undefined;
    Login: undefined;
    EmailInput: undefined;
    CheckEmailCode: { email: string, loginOrSignup: string };
    ChooseType: { user: User };
    SetDetails: { user: User };
    SetLanguages: { user: User };
    AccountCreated: { type: number, email: string };
    SetNetwork: { user: User };
    SetStatus: { user: User };
    SetExperience: { user: User };
    SelectPlan: { email: string };
    Paiement: { email: string, plan: number, billing: number };
    SelectZoneOnBoarding: { email: string };
    SelectZoneMap: { email: string };
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
            <Stack.Screen name="AccountCreated" component={AccountCreatedScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetNetwork" component={SetNetworkScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetStatus" component={SetStatusScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SetExperience" component={SetExperienceScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectPlan" component={SelectPlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Paiement" component={PaiementScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectZoneOnBoarding" component={SelectZoneOnBoardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectZoneMap" component={SelectZoneMapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}