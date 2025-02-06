import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors';
import BodyText from '../atoms/BodyText';

type Props = {
    onPress: () => void;
    firstname: string;
    imageUrl: string;
}
export default function UserSeeprofileBtn(props: Props) {
    return (
        <View style={{ flexDirection: 'row', gap: 12 }}>
            <Image source={{ uri: props.imageUrl ?? '' }} style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: Colors.lightGrey }} />
            <View>
                <BodyText text={props.firstname} isBold />
                <TouchableOpacity onPress={props.onPress}>
                    <BodyText text='Voir le profil' color={Colors.mainBlue} />
                </TouchableOpacity>
            </View>

        </View>
    )
}