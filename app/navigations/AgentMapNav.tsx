import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/agentMap/AgentMapScreen';
import Project from '../models/Project';
import AgentSeeProjectScreen from '../screens/agentMap/AgentSeeProjectScreen';
import AgentSeeUserProfileScreen from '../screens/agentMap/AgentSeeUserProfileScreen';

export type AgentMapNavParams = {
    HomeAgentMap: undefined;
    AgentSeeProject: { project: Project };
    AgentSeeUserProfile: { email: string };
};

const Stack = createStackNavigator<AgentMapNavParams>();


export default function AgentMapNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeAgentMap'}>
            <Stack.Screen name="HomeAgentMap" component={AgentMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentSeeProject" component={AgentSeeProjectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentSeeUserProfile" component={AgentSeeUserProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}