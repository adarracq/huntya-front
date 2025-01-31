import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import DropDown from '@/app/components/molecules/DropDown';
import User from '@/app/models/User';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '@/app/constants/Colors';
import BodyText from '@/app/components/atoms/BodyText';
import SmallText from '@/app/components/atoms/SmallText';
import UserPublic from '@/app/models/UserPublic';

type Props = {
    friends: UserPublic[];
    onSelectFriend: (friend: UserPublic) => void;
}

export default function AddGuestDrawer(props: Props) {
    return (
        <DropDown
            placeholder="Sélectionner des invités"
            title="Invités"
            items={[]}
            value={-1}
            onSelectItem={props.onSelectFriend}
            type="radio"

        >
            <ScrollView style={{ paddingHorizontal: 20, }}>
                {
                    props.friends.map((friend, index) => (
                        <TouchableOpacity onPress={() => props.onSelectFriend(friend)}
                            key={index}
                            style={styles.container}>
                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                <Image source={{ uri: friend.imageUrl ?? '' }} style={styles.image} />

                                <View style={{ alignItems: 'flex-start' }}>
                                    <BodyText text={friend.firstname ?? ''} isBold />
                                    <BodyText text={'Voir le profil'} color={Colors.mainBlue} />
                                </View>
                            </View>

                            {
                                friend.selected ?
                                    <MaterialCommunityIcons name="checkbox-marked" size={24} color={Colors.mainBlueLight} />
                                    :
                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={Colors.lightGrey} />

                            }

                        </TouchableOpacity>
                    ))
                }
                {
                    props.friends.length === 0 &&
                    <>
                        <BodyText text="Aucun invité" isMedium />
                        <SmallText text="Discuter avec d'autres utilisateurs pour les ajouter à vos contacts" isLeft />
                    </>
                }
            </ScrollView>
        </DropDown>
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