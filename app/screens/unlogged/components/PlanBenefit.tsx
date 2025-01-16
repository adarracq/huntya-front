import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors'
import { functions } from '@/app/utils/Functions'
import Title2 from '@/app/components/atoms/Title2'
import BodyText from '@/app/components/atoms/BodyText'

type Props = {
    icon: string,
    title: string,
    text: string
}
export default function PlanBenefit(props: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={functions.getIconSource(props.icon)}
                style={{ width: 20, height: 20, tintColor: Colors.mainBlue }}
            />
            <View style={{ paddingRight: 20 }}>
                <Title2 title={props.title} isLeft color={Colors.mainBlue} />
                <BodyText text={props.text} color={Colors.darkGrey} style={{ fontSize: 14 }} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        backgroundColor: Colors.lightBlue,
        borderRadius: 8,
        padding: 16,
    }
})