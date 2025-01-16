import { View, ViewStyle } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import Title1 from '../atoms/Title1';
import AntDesign from '@expo/vector-icons/AntDesign';

type PlusMinusInputProps = {
    value: number;
    minVal: number;
    maxVal: number;
    onChangeValue: (text: number) => void;
    style?: ViewStyle;
}

export default function PlusMinusInput(props: PlusMinusInputProps) {

    return (
        <View
            style={[props.style, {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 20,
                height: 50,
            }]}
        >
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: props.value > props.minVal ? Colors.mainBlue : Colors.lightGrey,
                padding: 8

            }} >
                <AntDesign name="minus" size={24}
                    color={props.value > props.minVal ? Colors.mainBlue : Colors.lightGrey}
                    onPress={() => {
                        if (props.value > props.minVal)
                            props.onChangeValue(props.value - 1);
                    }}
                    onLongPress={() => {
                        if (props.value > props.minVal + 10)
                            props.onChangeValue(props.value - 10);
                    }}
                />
            </View>
            <Title1 title={props.value.toString()} style={{ width: 30 }} />
            <View style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: props.value < props.maxVal ? Colors.mainBlue : Colors.lightGrey,
                padding: 8

            }} >
                <AntDesign name="plus" size={24}
                    color={props.value < props.maxVal ? Colors.mainBlue : Colors.lightGrey}
                    onPress={() => {
                        if (props.value < props.maxVal)
                            props.onChangeValue(props.value + 1);
                    }}
                    // make it increase exponentially when keeping the button pressed
                    onLongPress={() => {
                        if (props.value < props.maxVal)
                            props.onChangeValue(props.value + 10);
                    }}
                />
            </View>
        </View>
    )
}