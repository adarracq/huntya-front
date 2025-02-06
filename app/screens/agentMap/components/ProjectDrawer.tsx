import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Project from '@/app/models/Project'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Colors from '@/app/constants/Colors';
import ProjectDetails from '@/app/constants/ProjectDetails';
import SmallText from '@/app/components/atoms/SmallText';
import Title2 from '@/app/components/atoms/Title2';
import BodyText from '@/app/components/atoms/BodyText';
import { functions } from '@/app/utils/Functions';
import UserSeeprofileBtn from '@/app/components/molecules/UserSeeprofileBtn';
import Button from '@/app/components/atoms/Button';

type Props = {
    project: Project;
    open: boolean;
    onSeeProfile: () => void;
    onSeeProject: () => void;
    onMessage: () => void;
}
export default function ProjectDrawer(props: Props) {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        actionSheetRef.current?.show();
    }, [props.open])

    return (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingVertical: 35, paddingHorizontal: 20, gap: 20 }}>
                <View style={{ gap: 8 }}>
                    <View style={{
                        borderRadius: 100,
                        backgroundColor: ProjectDetails.types[props.project.type].color,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                    }}>
                        <SmallText text={ProjectDetails.types[props.project.type].label.toLocaleUpperCase()} color={Colors.white} isBold />
                    </View>
                    <Title2 title={props.project.addressString || 'Adresse inconnue'} isLeft />
                    {props.project.date && <BodyText text={functions.getStringDateDifference(props.project.date)} color={Colors.darkGrey} />}
                </View>

                <UserSeeprofileBtn
                    firstname={props.project.user_firstname}
                    imageUrl={props.project.user_imageUrl ?? ''}
                    onPress={props.onSeeProfile}
                />
                {
                    props.project.description && props.project.description.length > 0 &&
                    <View style={styles.presContainer}>
                        <BodyText text={props.project.description} isItalic />
                    </View>
                }
                <View style={{ gap: 20, flexDirection: 'row' }} >
                    <Button
                        backgroundColor={Colors.white}
                        textColor={Colors.mainBlue}
                        title="Voir le projet"
                        onPress={props.onSeeProject}
                        style={{ flex: 1 }}
                    />
                    <Button
                        backgroundColor={Colors.mainBlue}
                        textColor={Colors.white}
                        title="Contacter"
                        onPress={props.onMessage}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
        </ActionSheet>
    )
}

const styles = StyleSheet.create({
    presContainer: {
        backgroundColor: Colors.lightBlue,
        padding: 20,
        gap: 8,
        borderRadius: 12,
    },
})