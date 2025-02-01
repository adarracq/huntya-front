import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
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
import MenuItem from './components/MenuItem';
import Title2 from '@/app/components/atoms/Title2';
import AsyncStorageUser from '@/app/utils/AsyncStorageUser';

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

    function logout() {
        Alert.alert(
            'Déconnexion',
            'Voulez-vous vraiment vous déconnecter ?',
            [
                {
                    text: 'Annuler',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'Oui', onPress: () => {
                        AsyncStorageUser.Logout();
                        setUser(null);
                        setUserData(null);
                    }
                }
            ]
        );
    }

    useEffect(() => {
        getUserData();
    }, [isFocused]);

    return userData && (
        <View style={styles.container}>
            <ProfileHeader
                user={userData}
                onSeePublicProfile={() => console.log('onSeePublicProfile')}
            //onSeePublicProfile={() => navigation.navigate('PublicProfile', { user: userData })}
            />
            <View style={styles.menuContainer}>
                <MenuItem
                    onPress={() => navigation.navigate('EditPersonalData', { user: userData })}
                    text={'Informations personnelles'}
                    icon={'profile'}
                />
                <View style={styles.divider} />
                {
                    user.type == 'agent' ?
                        <>
                            <MenuItem
                                onPress={() => navigation.navigate('EditProData', { user: userData })}
                                text={'Informations professionnelles'}
                                icon={'briefcase'}
                            />
                            <View style={styles.divider} />
                            <MenuItem
                                onPress={() => console.log('onPress')}
                                text={'Mes zones'}
                                icon={'marker-home'}
                            />
                            <View style={styles.divider} />
                            <MenuItem
                                onPress={() => console.log('onPress')}
                                text={'Mon abonnement'}
                                icon={'credit-card'}
                            />
                        </>
                        :
                        <MenuItem
                            onPress={() => console.log('onPress')}
                            text={'Mes projets'}
                            icon={'home'}
                        />

                }

            </View>
            <TouchableOpacity
                onPress={logout}
            >
                <Title2 title="Déconnexion" color={Colors.mainRed} />
            </TouchableOpacity>
            {
                loading && <LoadingScreen />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        gap: 32,
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 104
    },
    menuContainer: {
        borderRadius: 16,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
    },
    divider: {
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    }
})