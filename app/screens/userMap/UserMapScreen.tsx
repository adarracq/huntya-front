import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { UserMapNavParams } from '@/app/navigations/UserMapNav';

type Props = NativeStackScreenProps<UserMapNavParams, 'HomeUserMap'>;
export default function UserMapScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text>UserMapScreen</Text>
        </View>
    )
}