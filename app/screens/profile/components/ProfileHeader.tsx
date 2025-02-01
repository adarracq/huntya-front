import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import User from '@/app/models/User';
import { functions } from '@/app/utils/Functions';
import Title1 from '@/app/components/atoms/Title1';
import Colors from '@/app/constants/Colors';
import BodyText from '@/app/components/atoms/BodyText';
import * as ImagePicker from 'expo-image-picker';
import { userService } from '@/app/services/user.service';
import Title0 from '@/app/components/atoms/Title0';

type Props = {
    user: User;
    onSeePublicProfile: () => void;
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
        <View style={styles.container}>
            <Image
                style={styles.picture}
                source={{ uri: props.user.imageUrl ?? '' }}
            />
            <TouchableOpacity onPress={pickImage}
                style={styles.editBtn}>

                <Image
                    source={functions.getIconSource('camera')}
                    style={styles.camera} />
            </TouchableOpacity>
            <Title0
                title={getFirstNameAndAge()}
            />
            <TouchableOpacity
                style={styles.btnPublicProfile}
                onPress={props.onSeePublicProfile}>
                <BodyText
                    text='Voir le profil public'
                    color={Colors.white}
                    isBold
                />

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 20,
        gap: 20
    },
    picture: {
        width: 120,
        height: 120,
        borderRadius: 200,
        marginBottom: 20,
        backgroundColor: 'grey'
    },
    editBtn: {
        borderRadius: 8,
        backgroundColor: Colors.mainBlue,
        alignItems: 'center',
        padding: 8,
        marginTop: -80,
        marginLeft: 100,
    },
    camera: {
        width: 20,
        height: 20,
        tintColor: Colors.white,
        alignSelf: 'center'
    },
    btnPublicProfile: {
        backgroundColor: Colors.mainBlue,
        padding: 12,
        borderRadius: 8
    }

})