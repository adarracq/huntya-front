import { View, ViewStyle, TouchableOpacity, Image, Button, Text } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import Colors from '../../constants/Colors';
import SmallText from '../atoms/SmallText';
import BodyText from '../atoms/BodyText';
import { functions } from '@/app/utils/Functions';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import SimpleRadioButton from './SimpleRadioButton';
import SimpleCheckbox from './SimpleCheckbox';

type DropDownProps = {
    placeholder: string;
    value: number;
    title: string;
    items: any[],
    selectedItemIds?: any[],
    onSelectItem: (item: any) => void;
    type: 'radio' | 'checkbox';
    style?: ViewStyle;
}

export default function DropDown(props: DropDownProps) {

    const actionSheetRef = useRef<ActionSheetRef>(null);

    return (
        <>
            <TouchableOpacity onPress={() => actionSheetRef.current?.show()}
                style={[{
                    width: '100%',
                    borderColor: Colors.lightGrey,
                    borderWidth: 1,
                    borderRadius: 16,

                    backgroundColor: Colors.white,
                }, props.style]}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                }}>
                    <View style={{ width: '80%' }}>
                        <SmallText
                            text={props.title}
                            color={Colors.darkGrey}
                            isLeft
                        />
                        <BodyText
                            text={props.items.find(item => item.id === props.value)?.label || props.placeholder}
                        />
                    </View>
                    <Image source={functions.getIconSource('arrow-down')}
                        style={{
                            width: 16,
                            height: 16,
                        }}
                    />
                </View>
            </TouchableOpacity>
            <ActionSheet ref={actionSheetRef}
                containerStyle={{
                    borderTopLeftRadius: 35,
                    borderTopRightRadius: 35,
                    backgroundColor: Colors.white,
                }}>
                <View style={{ paddingBottom: 50, paddingTop: 35, gap: 20 }}>
                    <SmallText text='Genre' isLeft style={{ paddingLeft: 16 }} />
                    {props.items.map((item, index) => (
                        props.type === 'radio' ?
                            <SimpleRadioButton
                                key={index}
                                title={item.label}
                                selected={item.id === props.value}
                                onPress={() => {
                                    props.onSelectItem(item);
                                    actionSheetRef.current?.hide();
                                }}
                            />
                            :
                            <SimpleCheckbox
                                key={index}
                                title={item.label}
                                selected={!!props.selectedItemIds && props.selectedItemIds.includes(item.id)}
                                onPress={() => {
                                    props.onSelectItem(item);
                                }}
                            />
                    ))}
                </View>
            </ActionSheet>
        </>
    )
}