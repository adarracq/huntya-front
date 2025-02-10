import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AgentMapScreen from '../screens/agentMap/AgentMapScreen';
import Project from '../models/Project';
import AgentSeeProjectScreen from '../screens/agentMap/AgentSeeProjectScreen';
import AgentSeeUserProfileScreen from '../screens/agentMap/AgentSeeUserProfileScreen';
import AMChatScreen from '../screens/agentMap/AMChatScreen';
import User from '../models/User';

export type AgentMapNavParams = {
    HomeAgentMap: undefined;
    AgentSeeProject: { user: User, project: Project };
    AgentSeeUserProfile: { user: User, email: string };
    AMChat: { user: User, withEmail: string };
};

const Stack = createStackNavigator<AgentMapNavParams>();


export default function AgentMapNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeAgentMap'}>
            <Stack.Screen name="HomeAgentMap" component={AgentMapScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentSeeProject" component={AgentSeeProjectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentSeeUserProfile" component={AgentSeeUserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AMChat" component={AMChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}