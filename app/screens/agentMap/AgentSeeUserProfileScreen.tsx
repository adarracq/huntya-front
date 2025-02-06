import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import PublicUserProfile from '@/app/components/organisms/PublicUserProfile';
import User from '@/app/models/User';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';

type Props = NativeStackScreenProps<AgentMapNavParams, 'AgentSeeUserProfile'>;
export default function AgentSeeUserProfileScreen({ navigation, route }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);
        userService.getByEmail(route.params.email)
            .then((response) => {
                setUser(response);
                setLoading(false);
            })
            .catch((error) => {
                showMessage({
                    message: "Erreur",
                    description: "Une erreur s'est produite",
                    type: "danger",
                });
                console.log(error);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    return user && !loading ? (
        <PublicUserProfile
            user={user}
            onSendMessage={() => console.log('sendMessage')}
            onBack={() => navigation.goBack()}
            onProjectPress={(project) => navigation.navigate('AgentSeeProject', { project })}
        />
    )
        : <LoadingScreen />
}