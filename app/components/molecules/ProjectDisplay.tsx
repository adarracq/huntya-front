import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Project from '@/app/models/Project';
import Colors from '@/app/constants/Colors';
import ProjectDetails from '@/app/constants/ProjectDetails';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import { functions } from '@/app/utils/Functions';
import BodyText from '../atoms/BodyText';

type Props = {
    project: Project;
    withUserName?: boolean;
    onPress?: () => void;
}
export default function ProjectDisplay(props: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
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
            {
                props.withUserName &&
                <>
                    <View style={styles.horizontalDivider} />
                    <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                        <Image source={{ uri: props.project.user_imageUrl ?? '' }} style={styles.userImage} />

                        <BodyText text={props.project.user_firstname} isBold color={Colors.mainBlue} />
                    </View>
                </>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderColor: Colors.veryLightGrey,
        borderWidth: 1,
        gap: 8,
        padding: 12
    },
    horizontalDivider: {
        height: 1,
        backgroundColor: Colors.veryLightGrey,
        marginHorizontal: -12
    },
    userImage: {
        width: 24,
        height: 24,
        borderRadius: 100,
        backgroundColor: Colors.lightGrey
    }
})