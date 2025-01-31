import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import ProfileHeader from './components/ProfileHeader';
import { UserContext } from '@/app/contexts/UserContext';
import { userService } from '@/app/services/user.service';
import { useIsFocused } from '@react-navigation/native';
import Colors from '@/app/constants/Colors';
import { showMessage } from 'react-native-flash-message';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';

type Props = NativeStackScreenProps<ProfileNavParams, 'HomeProfile'>;

export default function ProfileScreen({ navigation, route }: Props) {
    const [user, setUser] = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);

    function getUserData() {
        setLoading(true);
        userService.getByEmail(user.email)
            .then((response) => {
                setLoading(false);
                setUserData(response);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue lors de la récupération de vos données',
                    type: 'danger',
                    icon: 'danger'
                });
            });
    }

    useEffect(() => {
        getUserData();
    }, [isFocused]);

    return userData && (
        <View style={styles.container}>
            <ProfileHeader
                user={userData}
            />
            {
                loading && <LoadingScreen />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 104
    }
})