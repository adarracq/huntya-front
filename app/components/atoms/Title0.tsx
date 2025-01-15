import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title0Props = {
    title: string;
    color?: any;
    style?: TextStyle;
    isLeft?: boolean;
}

export default function Title0(props: Title0Props) {
    return (
        <Text style={[{
            color: props.color ? props.color : Colors.black,
            fontSize: 28,
            textAlign: props.isLeft ? 'left' : 'center',
            fontFamily: 'title-bold',
        }, props.style]}>{props.title}</Text>
    )
}