import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import BodyText from '@/app/components/atoms/BodyText';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import UserPublic from '@/app/models/UserPublic';

type Props = {
    guest: UserPublic;
    onRemove: () => void;
}
export default function GuestDisplay(props: Props) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Image source={{ uri: props.guest.imageUrl ?? '' }} style={styles.image} />

                <View style={{ alignItems: 'flex-start' }}>
                    <BodyText text={props.guest.firstname ?? ''} isBold />
                    <BodyText text={'Voir le profil'} color={Colors.mainBlue} />
                </View>
            </View>
            <TouchableOpacity onPress={props.onRemove}>
                <Image
                    source={functions.getIconSource('trash')}
                    style={{
                        width: 24,
                        height: 24,
                        tintColor: Colors.mainRed
                    }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        height: 50,
        backgroundColor: Colors.white,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: Colors.darkGrey,
    }

})