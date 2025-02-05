import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import User from '@/app/models/User';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import PublicAgentProfile from '@/app/components/organisms/PublicAgentProfile';

type Props = NativeStackScreenProps<ProfileNavParams, 'AgentPublicProfile'>;
export default function AgentPublicProfileScreen({ navigation, route }: Props) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const getUser = async () => {
        setLoading(true);
        userService.getByEmail(route.params.user.email)
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