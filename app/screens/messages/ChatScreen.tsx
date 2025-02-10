import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MessagesNavParams } from '@/app/navigations/MessagesNav';
import Chat from '@/app/components/organisms/Chat';


type Props = NativeStackScreenProps<MessagesNavParams, 'Chat'>;

export default function ChatScreen({ navigation, route }: Props) {

    const user = route.params.user;
    const withUser = route.params.withUser;

    return (
        <Chat
            user={user}
            withUser={withUser}
            onGoBack={() => navigation.goBack()}
            onSeeAgentProfile={() => navigation.navigate('AgentProfile', { user: withUser })}
            onSeeUserProfile={() => navigation.navigate('UserProfile', { user: withUser })}
        />
    )

}