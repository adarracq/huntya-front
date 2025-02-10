import React, { useEffect, useState } from 'react'
import Chat from '@/app/components/organisms/Chat'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';
import User from '@/app/models/User';
import { userService } from '@/app/services/user.service';

type Props = NativeStackScreenProps<AgentMapNavParams, 'AMChat'>;
export default function AMChatScreen({ navigation, route }: Props) {

  const [withUser, setWithUser] = useState<User | null>(null);

  function getWithUser() {
    userService.getByEmail(route.params.withEmail)
      .then((data) => {
        setWithUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getWithUser();
  }, []);



  return withUser && (
    <Chat
      withUser={withUser}
      user={route.params.user}
      onGoBack={() => navigation.goBack()}
      onSeeAgentProfile={() => console.log('see agent profile')}
      onSeeUserProfile={() => navigation.navigate('AgentSeeUserProfile', { user: route.params.user, email: route.params.withEmail })}
    />
  )

}