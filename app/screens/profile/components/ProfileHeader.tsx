import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import User from '@/app/models/User';
import { functions } from '@/app/utils/Functions';
import Title1 from '@/app/components/atoms/Title1';
import Colors from '@/app/constants/Colors';
import BodyText from '@/app/components/atoms/BodyText';
import * as ImagePicker from 'expo-image-picker';
import { userService } from '@/app/services/user.service';

type Props = {
    user: User;
}
export default function ProfileHeader(props: Props) {

    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            let uri = result.assets[0].uri;
            const formData = new FormData();
            const response = await fetch(uri);
            const blob = await response.blob();
            formData.append('image', blob);


            /*await userService.uploadPicture(props.user.email, formData)
                .then(() => {
                    console.log('Image updated');
                })
                .catch((error) => {
                    console.log(error);
                });*/

        }
    };

    function getFirstNameAndAge() {
        let res = '';
        if (props.user.firstname) {
            res += props.user.firstname;
        }
        if (props.user.birthdate) {
            res += `, ${functions.getAgeFromBirthdate(props.user.birthdate)}`;
        }
        return res;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
            <Image
                style={styles.picture}
                source={{ uri: props.user.imageUrl ?? '' }}
            />
            <TouchableOpacity onPress={pickImage}
                style={styles.editBtn}>

                <Image
                    source={functions.getIconSource('camera')}
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: Colors.mainBlue,
                        alignSelf: 'center'
                    }} />
                <BodyText
                    text={props.user.imageUrl ? 'Modifier' : 'Ajouter'}
                    color={Colors.mainBlue}
                />
            </TouchableOpacity>
            <Title1
                title={getFirstNameAndAge()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    picture: {
        width: 120,
        height: 120,
        borderRadius: 200,
        marginBottom: 20,
        backgroundColor: 'grey'
    },
    editBtn: {
        borderRadius: 16,
        backgroundColor: Colors.lightGrey,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: -36,
    },
})