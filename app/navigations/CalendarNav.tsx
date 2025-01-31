import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import User from '../models/User';
import CalendarScreen from '../screens/calendar/CalendarScreen';

export type CalendarNavParams = {
    HomeCalendar: undefined;
};

const Stack = createStackNavigator<CalendarNavParams>();


export default function CalendarNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeCalendar'}>
            <Stack.Screen name="HomeCalendar" component={CalendarScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}