import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

type SmallTextProps = {
    text: string;
    color?: any;
    isLeft?: boolean;
    isBold?: boolean;
    isItalic?: boolean;
    style?: TextStyle;
}

export default function SmallText(props: SmallTextProps) {
    return (
        <Text style={[{
            fontSize: 12,
            textAlign: props.isLeft ? 'left' : 'center',
            fontFamily: props.isItalic ? 'text-italic' : props.isBold ? 'text-bold' : 'text-regular',
            color: props.color ? props.color : Colors.darkGrey,
        }, props.style]}>{props.text}</Text>
    )
}