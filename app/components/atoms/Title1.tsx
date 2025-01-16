import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type Title1Props = {
    title: string;
    color?: any;
    style?: TextStyle;
    isLeft?: boolean;
}

export default function Title1(props: Title1Props) {
    return (
        <Text style={[{
            color: props.color ? props.color : Colors.black,
            fontSize: 18,
            textAlign: props.isLeft ? 'left' : 'center',
            fontFamily: 'title-bold',
        }, props.style]}>{props.title}</Text>
    )
}