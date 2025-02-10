import { View, Text } from 'react-native'
import React from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import ProjectPresentation from '@/app/components/organisms/ProjectPresentation';
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';

type Props = NativeStackScreenProps<AgentMapNavParams, 'AgentSeeProject'>;
export default function AgentSeeProjectScreen({ navigation, route }: Props) {

    const project = route.params.project;
    const userData = route.params.user;

    return (
        <ProjectPresentation
            project={project}
            onBack={() => navigation.goBack()}
            onSendMessage={() => navigation.navigate('AMChat', { user: userData, withEmail: project.user_email })}
            onSeeProfile={() => navigation.navigate('AgentSeeUserProfile', { user: userData, email: project.user_email })}
        />
    )
}