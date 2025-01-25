import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import { functions } from '@/app/utils/Functions';
import Languages from '@/app/constants/Languages';
import CheckBox from '@/app/components/molecules/Checkbox';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<NavParams, 'SetLanguages'>;
export default function SetLanguagesScreen({ navigation, route }: Props) {

    const user = route.params.user;
    const [languages, setLanguages] = useState(Languages.languages);
    const [loading, setLoading] = useState(false);

    function changeLanguage(id: number) {
        setLanguages(languages.map((language) => language.id === id ? { ...language, selected: !language.selected } : language));
    }


    const next = () => {
        let user = { ...route.params.user };
        user.languages = languages.filter(language => language.selected).map(language => language.id);
        // if user is particulier we save the data and navigate to account created screen
        if (user.type === 0) {
            setLoading(true);
            userService.update({ user })
                .then((response) => {
                    setLoading(false);
                    navigation.navigate('AccountCreated', { type: user.type || 0, email: user.email });
                })
                .catch((error) => {
                    console.log(error);
                    showMessage({
                        message: 'Erreur',
                        description: 'Une erreur est survenue lors de la création du compte',
                        type: 'danger',
                    })
                    setLoading(false);
                })
        }
        // if user is agent we continue the registration process
        else {
            navigation.navigate('SetNetwork', { user });
        }

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={4} title="Langues" width={80}
                    total={user.type === 0 ? 4 : 9}
                />
                <Title0 title={'Quelle(s) langue(s) parlez-vous ?'} isLeft />
            </View>
            <ScrollView contentContainerStyle={{ gap: 16, paddingVertical: 30 }}>
                {
                    languages.map((language, index) => (
                        <CheckBox
                            key={index}
                            title={language.label}
                            onPress={() => changeLanguage(language.id)}
                            selected={language.selected}
                            icon={language.icon}
                        />
                    ))
                }
            </ScrollView>
            <Button title="Suivant"
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                onPress={next} />

            {
                loading && <LoadingScreen />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.white
    },
})