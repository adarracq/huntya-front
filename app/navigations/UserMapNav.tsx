import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/agentMap/AgentMapScreen';
import UserMapScreen from '../screens/userMap/UserMapScreen';

export type UserMapNavParams = {
    HomeUserMap: undefined;
};

const Stack = createStackNavigator<UserMapNavParams>();


export default function UserMapNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeUserMap'}>
            <Stack.Screen name="HomeUserMap" component={UserMapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}