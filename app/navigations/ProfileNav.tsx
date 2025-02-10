import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/profile/ProfileScreen';
import User from '../models/User';
import EditPersonalDataScreen from '../screens/profile/EditPersonalDataScreen';
import EditProDataScreen from '../screens/profile/EditProDataScreen';
import EditPlanScreen from '../screens/profile/EditPlanScreen';
import MyProjectsScreens from '../screens/projects/MyProjectsScreens';
import NewProject1ZoneScreen from '../screens/projects/NewProject1ZoneScreen';
import NewProject2DetailsScreen from '../screens/projects/NewProject2DetailsScreen';
import NewProject0TypeScreen from '../screens/projects/NewProject0TypeScreen';
import NewProject3DescrScreen from '../screens/projects/NewProject3DescrScreen';
import Project from '../models/Project';
import SeeProjectScreen from '../screens/projects/SeeProjectScreen';
import UserPublicProfileScreen from '../screens/projects/UserPublicProfileScreen';
import AgentPublicProfileScreen from '../screens/projects/AgentPublicProfileScreen';
import EditZoneScreen from '../screens/profile/EditZoneMapScreen';

export type ProfileNavParams = {
    HomeProfile: undefined;
    EditPersonalData: { user: User }
    EditProData: { user: User }
    EditPlan: { user: User }
    MyProjects: { user: User }
    EditZone: { user: User }
    NewProject0Type: { user: User }
    NewProject1Zone: { project: Project }
    NewProject2Details: { project: Project }
    NewProject3Descr: { project: Project }
    SeeProject: { project: Project }
    UserPublicProfile: { email: string };
    AgentPublicProfile: { user: User };
};

const Stack = createStackNavigator<ProfileNavParams>();

export default function ProfileNav() {

    return (
        <Stack.Navigator initialRouteName={'HomeProfile'}>
            <Stack.Screen name="HomeProfile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditPersonalData" component={EditPersonalDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditProData" component={EditProDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditPlan" component={EditPlanScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MyProjects" component={MyProjectsScreens} options={{ headerShown: false }} />
            <Stack.Screen name="EditZone" component={EditZoneScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProject0Type" component={NewProject0TypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProject1Zone" component={NewProject1ZoneScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProject2Details" component={NewProject2DetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="NewProject3Descr" component={NewProject3DescrScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SeeProject" component={SeeProjectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserPublicProfile" component={UserPublicProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AgentPublicProfile" component={AgentPublicProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}