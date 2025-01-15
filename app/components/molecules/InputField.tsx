import { View, TextInput, TextStyle, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import Entypo from '@expo/vector-icons/Entypo';
import BodyText from '../atoms/BodyText';

type InputFieldProps = {
    placeholder: string;
    value: string;
    title: string;
    onChangeText: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    errorText?: string | null;
    keyBoardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'number-pad';
    isMultiline?: boolean;
    height?: number;
    style?: ViewStyle;
}

export default function InputField(props: InputFieldProps) {

    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus();
        }
    }

    const onBlur = () => {
        setIsFocused(false);
        if (props.onBlur) {
            props.onBlur();
        }
    }


    return (
        <View>
            <View
                style={[{
                    width: '100%',
                    borderColor: props.errorText ? Colors.mainRed : isFocused ? Colors.mainBlue : Colors.lightGrey,
                    borderWidth: isFocused || props.errorText ? 2 : 1,
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: Colors.white,
                }, props.style]}
            >
                <SmallText
                    text={props.title}
                    color={isFocused ? Colors.mainBlue : Colors.darkGrey}
                    isLeft
                />
                <TextInput
                    style={{
                        fontFamily: 'title-regular',
                        fontSize: 16,
                        textAlignVertical: props.isMultiline ? 'top' : 'center',
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder={props.placeholder}
                    keyboardType={props.keyBoardType || 'default'}
                    multiline={props.isMultiline}
                />
            </View>
            {props.errorText && <SmallText text={props.errorText} color={Colors.mainRed} />}
        </View>
    )
}