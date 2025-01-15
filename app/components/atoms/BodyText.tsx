import { View, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors';

type BodyTextProps = {
    text: string;
    style?: TextStyle;
    color?: string;
    isItalic?: boolean;
    isBold?: boolean;
    isMedium?: boolean;
    centered?: boolean;
}

export default function BodyText(props: BodyTextProps) {
    return (
        <Text style={[{
            fontSize: 16,
            color: props.color ? props.color : Colors.black,
            textAlign: props.centered ? 'center' : 'left',
            fontFamily: props.isItalic ? 'text-italic' : props.isBold ? 'text-bold' : props.isMedium ? 'text-medium' : 'text-regular',
        }, props.style]}>
            {props.text}
        </Text>
    )
}