import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { functions } from '@/app/utils/Functions';
import SmallText from '../atoms/SmallText';

type TabBarElementProps = {
    title: string;
    focused: boolean;
    name: string;
}

export default function TabBarElement(props: TabBarElementProps) {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: Dimensions.get('window').width / 4,
            height: 70,
            marginTop: 24,
        }}>
            <Image
                source={functions.getIconSource(props.name)}
                style={{
                    width: 24,
                    height: 24,
                    tintColor: props.focused ? Colors.mainBlue : Colors.darkGrey
                }}
            />
            <SmallText text={props.title} color={
                props.focused ? Colors.mainBlue : Colors.darkGrey
            }
                style={{
                    textAlign: 'center',
                    fontWeight: props.focused ? 'bold' : 'normal'
                }}
            />
        </View>

    )
}
