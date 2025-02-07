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
import { UserMapNavParams } from '@/app/navigations/UserMapNav';
import PublicAgentProfile from '@/app/components/organisms/PublicAgentProfile';

type Props = NativeStackScreenProps<UserMapNavParams, 'UserSeeAgentProfile'>;
export default function UserSeeAgentProfileScreen({ navigation, route }: Props) {
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
        <PublicAgentProfile
            user={user}
            onSendMessage={() => console.log('sendMessage')}
            onBack={() => navigation.goBack()}
        />
    )
        : <LoadingScreen />
}