import { View, Text } from 'react-native'
import React from 'react'
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type Props = NativeStackScreenProps<AgentMapNavParams, 'HomeAgentMap'>;
export default function AgentMapScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text>AgentMapScreen</Text>
        </View>
    )
}