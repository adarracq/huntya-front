import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/agentMap/AgentMapScreen';

export type AgentMapNavParams = {
    HomeAgentMap: undefined;
};

const Stack = createStackNavigator<AgentMapNavParams>();


export default function AgentMapNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeAgentMap'}>
            <Stack.Screen name="HomeAgentMap" component={AgentMapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}