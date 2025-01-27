import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Zone from '@/app/models/Zone';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Colors from '@/app/constants/Colors';
import Title1 from '@/app/components/atoms/Title1';
import Button from '@/app/components/atoms/Button';
import SmallText from '@/app/components/atoms/SmallText';
import DeletableField from '@/app/components/molecules/DeletableField';

type Props = {
    zones: Zone[];
    open: boolean;
    onDeleteZone: (index: number) => void;
    onValidate: () => void;
}

export default function ValidateZoneDrawer(props: Props) {

    const actionSheetRef = useRef<ActionSheetRef>(null);

    // open the action sheet 
    useEffect(() => {
        if (props.zones.length > 0)
            actionSheetRef.current?.show();
    }, [props.open])

    return props.zones && (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 35, gap: 24 }}>
                <Title1 title="Souhaitez-vous valider ces zones ?" isLeft />

                <View style={{ gap: 16 }}>
                    <SmallText text="Liste des zones sélectionnées" isLeft />
                    {props.zones.map((zone, index) => {
                        return (
                            <DeletableField
                                key={index}
                                text={zone ? zone.nom : "Zone non sélectionnée"}
                                isSet={zone !== null}
                                onDelete={() => {
                                    props.onDeleteZone(index);
                                }}
                            />
                        )
                    })
                    }
                </View>


                <Button
                    title="Valider ma sélection"
                    backgroundColor={Colors.mainBlue}
                    textColor={Colors.white}
                    onPress={() => {
                        props.onValidate();
                        actionSheetRef.current?.hide();
                    }}
                />

            </View>
        </ActionSheet >
    )
}