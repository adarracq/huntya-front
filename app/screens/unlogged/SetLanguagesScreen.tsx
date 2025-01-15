import { View, Text } from 'react-native'
import React from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

type Props = NativeStackScreenProps<NavParams, 'SetLanguages'>;
export default function SetLanguagesScreen({ navigation, route }: Props) {
    return (
        <View>
            <Text>SetLanguagesScreen</Text>
        </View>
    )
}