import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors';
import Title2 from '@/app/components/atoms/Title2';
import BodyText from '@/app/components/atoms/BodyText';
import SmallText from '@/app/components/atoms/SmallText';
import Title1 from '@/app/components/atoms/Title1';

type Props = {
    name: string,
    picture: string,
    lastMessage: string,
    lastMessageDate: string,
    isRead: boolean,
    nbUnreadMessages: number,
    onPress: () => void
}

export default function ConversationHeading(props: Props) {

    return (
        <TouchableOpacity
            style={[styles.container, { borderLeftWidth: props.isRead ? 0 : 8 }]}
            onPress={props.onPress}
        >
            <Image
                source={{
                    uri: (process.env.EXPO_PUBLIC_DEV_API_URL || 'https://default-url.com') + props.picture
                }}
                style={styles.picture} />
            <View>
                <Title1 title={props.name} color={
                    props.isRead ? Colors.darkGrey : Colors.black
                } isLeft />
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'flex-end' }}>
                    <BodyText text={props.lastMessage + ' · ' + props.lastMessageDate}
                        color={props.isRead ? Colors.darkGrey : Colors.black}
                        isBold={!props.isRead}
                    />
                </View>

            </View>
            {
                !props.isRead &&
                <View style={styles.date}>
                    <Title2 title={props.nbUnreadMessages.toString()} color={Colors.white} />
                </View>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.white,
        padding: 10,
        borderColor: Colors.mainBlue,
    },
    picture: {
        width: 48,
        height: 48,
        borderRadius: 24,
        objectFit: 'cover',
    },
    date: {
        marginLeft: 'auto',
        backgroundColor: Colors.mainBlue,
        color: Colors.white,
        borderRadius: 30,
        width: 24,
        height: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})