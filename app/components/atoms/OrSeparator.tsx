import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import SmallText from './SmallText'
import BodyText from './BodyText'

export default function OrSeparator() {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 20
            }}
        >
            <View style={{
                borderBottomColor: Colors.white,
                borderBottomWidth: 1,
                flex: 1,
                alignSelf: 'center',
                marginTop: 5
            }} />
            <BodyText text="ou" color={Colors.white} />
            <View style={{
                borderBottomColor: Colors.white,
                borderBottomWidth: 1,
                flex: 1,
                alignSelf: 'center',
                marginTop: 5
            }} />
        </View>
    )
}