import PublicUserProfile from '@/app/components/organisms/PublicUserProfile';
import { MessagesNavParams } from '@/app/navigations/MessagesNav';
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type Props = NativeStackScreenProps<MessagesNavParams, 'UserProfile'>;

export default function UserProfileScreen({ navigation, route }: Props) {

    return (
        <PublicUserProfile
            user={route.params.user}
            onSendMessage={() => navigation.goBack()}
            onBack={() => navigation.goBack()}
            onProjectPress={(project) => console.log('project pressed')}
        />
    )
}
