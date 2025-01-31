import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/profile/ProfileScreen';

export type ProfileNavParams = {
    HomeProfile: undefined;
};

const Stack = createStackNavigator<ProfileNavParams>();


export default function ProfileNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeProfile'}>
            <Stack.Screen name="HomeProfile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}