import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import Colors from '@/app/constants/Colors';
import Title2 from '@/app/components/atoms/Title2';
import Zone from '@/app/models/Zone';
import BodyText from '@/app/components/atoms/BodyText';
import Title1 from '@/app/components/atoms/Title1';
import Button from '@/app/components/atoms/Button';
import { functions } from '@/app/utils/Functions';
import AntDesign from '@expo/vector-icons/AntDesign';

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
                <View style={{ gap: 8 }}>
                    {
                        props.zone.isSelected &&
                        <View style={styles.selectedContainer}>
                            <AntDesign name="checkcircle" size={16} color={Colors.white} />
                            <BodyText text='SELECTIONNÉE'
                                color={Colors.white} isMedium />
                        </View>
                    }
                    <Title1 title={props.zone.nom} isLeft />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Image source={functions.getIconSource('profile')} style={{ width: 16, height: 16, tintColor: Colors.mainBlue }} />
                        <BodyText text={functions.separateThousands(props.zone.population) + ' habitants'} color={Colors.mainBlue} isMedium />
                    </View>
                </View>
                {
                    props.zone.isNew ?
                        <View style={{ backgroundColor: Colors.lightBlue, padding: 12, borderRadius: 12 }}>
                            <Title2 title="Aucun projet publié" style={{ color: Colors.mainBlue }} isLeft />
                            <BodyText text="Soyez le premier agent immobilier à ouvrir cette zone." />
                        </View>
                        :
                        <View style={{ gap: 16 }}>
                            <View style={styles.lineContainer}>
                                <View style={styles.iconContainer}>
                                    <Image source={functions.getIconSource('home')} style={styles.icon} />
                                </View>
                                <Title2 title={props.zone.nbProjets > 0 ?
                                    props.zone.nbProjets + ' projets publiés' : 'Aucun projet publié'} />
                            </View>
                            <View style={styles.lineContainer}>
                                <View style={styles.iconContainer}>
                                    <Image source={functions.getIconSource('message')} style={styles.icon} />
                                </View>
                                <Title2 title={props.zone.nbContacts > 0 ?
                                    props.zone.nbContacts + ' mises en contact privées' : 'Aucune mise en contact'} />
                            </View>
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

const styles = StyleSheet.create({
    selectedContainer: {
        backgroundColor: Colors.lightGreen,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
        alignSelf: 'flex-start'
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.veryLightGrey,
        padding: 12,
        borderRadius: 12
    },
    iconContainer: {
        backgroundColor: Colors.lightBlue,
        padding: 10,
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.mainBlue
    }
})