import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import Project from '@/app/models/Project';
import Colors from '@/app/constants/Colors';
import ProjectDetails from '@/app/constants/ProjectDetails';
import SmallText from '../atoms/SmallText';
import Title2 from '../atoms/Title2';
import { functions } from '@/app/utils/Functions';
import BodyText from '../atoms/BodyText';
import User from '@/app/models/User';
import AgentSpecialities from '@/app/constants/AgentSpecialities';
import { Pressable, ScrollView } from 'react-native-gesture-handler';

type Props = {
    agent: User;
    onPress?: () => void;
}
export default function AgentDisplay(props: Props) {
    const agentProperties = props.agent.agentProperties;
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 12, }}>
                {
                    agentProperties?.specialities && agentProperties.specialities.map((speciality) => {
                        return <View style={{
                            borderRadius: 100,
                            backgroundColor: AgentSpecialities.specialities[speciality].color,
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                        }}>
                            <SmallText text={AgentSpecialities.specialities[speciality].label.toLocaleUpperCase()} color={Colors.white} isBold />
                        </View>
                    })
                }
            </ScrollView>
            <View style={{ flexDirection: 'row', gap: 8 }}>
                <Image source={functions.getIconSource('briefcase')} style={{ width: 20, height: 20, tintColor: Colors.darkGrey }} />
                <BodyText text={agentProperties?.experience + " années d'expérience"} isMedium />
            </View>

            <View style={styles.horizontalDivider} />
            <TouchableOpacity style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }} onPress={props.onPress}>
                <Image source={{ uri: (process.env.EXPO_PUBLIC_DEV_API_URL || 'https://default-url.com') + props.agent.imageUrl }} style={styles.userImage} />

                <BodyText text={props.agent.firstname || ''} isBold color={Colors.mainBlue} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        borderColor: Colors.veryLightGrey,
        borderWidth: 1,
        gap: 8,
        padding: 12,
        width: Dimensions.get('window').width - 40
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