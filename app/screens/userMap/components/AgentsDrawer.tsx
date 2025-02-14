import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
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
import User from '@/app/models/User';
import Title1 from '@/app/components/atoms/Title1';
import Zone from '@/app/models/Zone';
import AgentDisplay from '@/app/components/molecules/AgentDisplay';

type Props = {
    zone: { zone: Zone, agents: User[] };
    open: boolean;
    onSeeProfile: (email: string) => void;
    onMessage: (email: string) => void;
}
export default function AgentsDrawer(props: Props) {
    const actionSheetRef = useRef<ActionSheetRef>(null);

    useEffect(() => {
        actionSheetRef.current?.show();

    }, [props.open, props.zone]);

    return (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingTop: 35, gap: 20, maxHeight: 500 }}>
                <View style={{ gap: 8, paddingHorizontal: 20 }}>
                    <Title1 title={props.zone.zone.nom} isLeft />
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Image source={functions.getIconSource('briefcase')} style={{ width: 20, height: 20, tintColor: Colors.mainBlue }} />
                        <BodyText text={props.zone.agents.length +
                            (props.zone.agents.length > 1 ? " agents" : " agent")
                        } color={Colors.mainBlue} />
                    </View>
                </View>
                <ScrollView contentContainerStyle={{ gap: 12, paddingHorizontal: 20, paddingBottom: 20 }}>
                    {
                        props.zone.agents.map((agent, index) => {
                            return <AgentDisplay agent={agent} key={index} onPress={() => props.onSeeProfile(agent.email)} />
                        })
                    }
                </ScrollView>
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