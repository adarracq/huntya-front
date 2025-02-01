import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/profile/ProfileScreen';
import User from '../models/User';
import EditPersonalDataScreen from '../screens/profile/EditPersonalDataScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { BottomNavParams } from './BottomTabNav';
import EditProDataScreen from '../screens/profile/EditProDataScreen';

export type ProfileNavParams = {
    HomeProfile: undefined;
    EditPersonalData: { user: User }
    EditProData: { user: User }
};

const Stack = createStackNavigator<ProfileNavParams>();

export default function ProfileNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeProfile'}>
            <Stack.Screen name="HomeProfile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditPersonalData" component={EditPersonalDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProData" component={EditProDataScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}