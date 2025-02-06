import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Colors from '@/app/constants/Colors';
import SmallText from '@/app/components/atoms/SmallText';
import SimpleRadioButton from '@/app/components/molecules/SimpleRadioButton';
import SimpleCheckbox from '@/app/components/molecules/SimpleCheckbox';

type Props = {
    value: number;
    title: string;
    items: any[],
    onSelectItem: (item: any) => void;
    type: 'radio' | 'checkbox';
    open: boolean;
}

export default function DrawerCBR(props: Props) {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        if (props.open) {
            actionSheetRef.current?.show();
        } else {
            actionSheetRef.current?.hide();
        }
    }, [props.open])



    return (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingBottom: 50, paddingTop: 35, gap: 20 }}>
                <SmallText text={props.title} isLeft style={{ paddingLeft: 16 }} />
                {

                    props.items.map((item, index) => (
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
                                icon={item.icon ? item.icon : null}
                                selected={item.selected}
                                onPress={() => {
                                    props.onSelectItem(item);
                                }}
                            />
                    ))}
            </View>
        </ActionSheet>
    )
}