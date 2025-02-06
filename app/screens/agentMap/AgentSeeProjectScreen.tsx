import { View, Text } from 'react-native'
import React from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import ProjectPresentation from '@/app/components/organisms/ProjectPresentation';
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';

type Props = NativeStackScreenProps<AgentMapNavParams, 'AgentSeeProject'>;
export default function AgentSeeProjectScreen({ navigation, route }: Props) {

    const project = route.params.project;

    return (
        <ProjectPresentation
            project={project}
            onBack={() => navigation.goBack()}
            onSendMessage={() => console.log('sendMessage')}
            onSeeProfile={() => navigation.navigate('AgentSeeUserProfile', { email: project.user_email })}
        />
    )
}