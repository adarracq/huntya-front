import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Colors from '@/app/constants/Colors';
import Title2 from '@/app/components/atoms/Title2';
import Zone from '@/app/models/Zone';
import BodyText from '@/app/components/atoms/BodyText';
import Title1 from '@/app/components/atoms/Title1';
import Button from '@/app/components/atoms/Button';

type Props = {
    zone: Zone | null;
    open: boolean;
    onAddZone: () => void;
    onDeleteZone: () => void;
}

export default function ZoneDrawer(props: Props) {

    const actionSheetRef = useRef<ActionSheetRef>(null);

    // open the action sheet 
    useEffect(() => {
        if (props.zone)
            actionSheetRef.current?.show();
    }, [props.open])

    return props.zone && (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 35, gap: 24 }}>
                <Title1 title={props.zone.nom} isLeft />
                {
                    props.zone.isNew &&
                    <View style={{ backgroundColor: Colors.lightBlue, padding: 12, borderRadius: 12 }}>
                        <Title2 title="Aucun projet publié" style={{ color: Colors.mainBlue }} isLeft />
                        <BodyText text="Soyez le premier agent immobilier à ouvrir cette zone." />
                    </View>
                }
                {
                    props.zone.isSelected ?
                        <Button
                            title="Supprimer cette zone"
                            backgroundColor={Colors.white}
                            textColor={Colors.mainRed}
                            style={{ borderColor: Colors.mainRed, borderWidth: 1 }}
                            onPress={() => {
                                props.onDeleteZone();
                                actionSheetRef.current?.hide();
                            }}
                        /> :
                        <Button
                            title="Sélectionner cette zone"
                            backgroundColor={Colors.mainBlue}
                            textColor={Colors.white}
                            onPress={() => {
                                props.onAddZone();
                                actionSheetRef.current?.hide();
                            }}
                        />

                }
            </View>
        </ActionSheet >
    )
}