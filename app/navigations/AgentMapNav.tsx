import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

export type CalendarNavParams = {
    HomeMap: undefined;
};

const Stack = createStackNavigator<CalendarNavParams>();


export default function AgentMapNav() {

    /*return (
        <Stack.Navigator initialRouteName={'HomeAgentMap'}>
            <Stack.Screen name="HomeAgentMap" component={HomeMapScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )*/
}