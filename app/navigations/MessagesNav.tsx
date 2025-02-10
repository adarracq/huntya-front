import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MessagesScreen from '../screens/messages/MessagesScreen';
import ChatScreen from '../screens/messages/ChatScreen';
import User from '../models/User';
import AgentProfileScreen from '../screens/messages/AgentProfileScreen';
import UserProfileScreen from '../screens/messages/UserProfileScreen';

export type MessagesNavParams = {
    Home: undefined;
    Chat: { user: User, withUser: User };
    AgentProfile: { user: User };
    UserProfile: { user: User };
};

const Stack = createStackNavigator<MessagesNavParams>();


export default function MessagesNav() {

    return (
        <Stack.Navigator initialRouteName={'Home'}
            screenOptions={{
                headerShown: false, // Désactive le header par défaut
            }}
        >
            <Stack.Screen name="Home" component={MessagesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentProfile" component={AgentProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}