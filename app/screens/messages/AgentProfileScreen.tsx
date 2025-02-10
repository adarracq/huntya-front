import PublicAgentProfile from '@/app/components/organisms/PublicAgentProfile';
import User from '@/app/models/User';
import { MessagesNavParams } from '@/app/navigations/MessagesNav';
import { userService } from '@/app/services/user.service';
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type Props = NativeStackScreenProps<MessagesNavParams, 'AgentProfile'>;

export default function AgentProfileScreen({ navigation, route }: Props) {

    const user = route.params.user;
    const [agent, setAgent] = useState<User | null>(null);

    function getAgent() {
        userService.getByEmail(user.email)
            .then((agent) => {
                setAgent(agent);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAgent();
    }, []);

    return agent && (
        <PublicAgentProfile
            user={user}
            onSendMessage={() => {
                console.log('sendMessage');
            }}
            onBack={() => navigation.goBack()}

        />
    )
}
