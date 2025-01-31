import React, { useContext, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../constants/Colors';
import { StyleSheet } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import TabBarElement from '../components/molecules/TabBarElement';
import CalendarNav from './CalendarNav';
import ProfileNav from './ProfileNav';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

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

    const noTabBarScreens = ['EditPersonalData'];
    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={(props) => {
                console.log(getFocusedRouteNameFromRoute(props.route));
                return {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        ...styles.tabBarStyle,
                        display:
                            noTabBarScreens.includes(getFocusedRouteNameFromRoute(props.route) ?? '')
                                ? "none"
                                : "flex",
                    },
                };
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