import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import TabBarElement from '../components/molecules/TabBarElement';
import CalendarNav from './CalendarNav';
import ProfileNav from './ProfileNav';

export type BottomNavParams = {
    Project: undefined;
    Calendar: undefined;
    Map: undefined;
    Messages: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomNavParams>();


export default function BottomTabNav() {
    const [user, setUser] = useContext(UserContext);

    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={{
                tabBarStyle: { ...styles.tabBarStyle },
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Calendar"
                component={CalendarNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Calendrier',
                            focused: focused,
                            name: 'calendar'
                        })
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                //component={user && user.type == 'agent' ? AgentMapNav : UserMapNav}
                component={CalendarNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Carte',
                            focused: focused,
                            name: 'map'
                        })
                    ),
                }}
            />
            <Tab.Screen
                name="Messages"
                //component={MessagesNav}
                component={CalendarNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Messages',
                            focused: focused,
                            name: 'messages'
                        })
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNav}
                options={{
                    tabBarIcon: ({ focused }) => (
                        TabBarElement({
                            title: 'Profil',
                            focused: focused,
                            name: 'profile'
                        })
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 70,
        borderRadius: 18,
        backgroundColor: Colors.white,
        position: 'absolute',
        marginBottom: 34,
        marginHorizontal: 16,
        alignContent: 'center',
        justifyContent: 'center',
    },
})