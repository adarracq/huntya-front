import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Button from '@/app/components/atoms/Button'
import Colors from '@/app/constants/Colors'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { showMessage } from 'react-native-flash-message';
import InputField from '@/app/components/molecules/InputField';
import Title0 from '@/app/components/atoms/Title0';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import { functions } from '@/app/utils/Functions';
import { useQuery } from "react-query";
import { userService } from '@/app/services/user.service';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';


type Props = NativeStackScreenProps<NavParams, 'EmailInput'>;
export default function EmailInputScreen({ navigation, route }: Props) {

    const [email, setEmail] = useState('');
    const [emailErrorText, setEmailErrorText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    function onEmailChange(text: string) {

        setEmail(text);

        if (!text || text === '') {
            setEmailErrorText('Veuillez entrer un email');
        }
        else if (!/\S+@\S+\.\S+/.test(text)) {
            setEmailErrorText('Veuillez entrer un email valide');
        }
        else {
            setEmailErrorText(null);
            setEmail(text);
        }
    }

    const next = () => {
        // if no input we show an error
        if (!email || email === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez entrer un email',
                type: 'danger',
            })
            setEmailErrorText('Veuillez entrer un email');
            return;
        }

        // if email not valid we show an error
        if (emailErrorText) {
            showMessage({
                message: 'Erreur',
                description: emailErrorText,
                type: 'danger',
            });
            return;
        }

        setEmailErrorText(null);

        setLoading(true);
        userService.loginOrSignup({ email: email })
            .then((res) => {
                setLoading(false);
                if (res.message) {
                    navigation.navigate('CheckEmailCode', { email: email, loginOrSignup: res.message });
                }
                else {
                    showMessage({
                        message: 'Erreur',
                        description: res.message,
                        type: 'danger',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue',
                    type: 'danger',
                });
            });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 30 }}>
                <ProgressBar progress={1} total={4} title="E-mail" width={80} />
                <Title0 title={'Quelle est votre adresse e-mail ?'} isLeft />
                <InputField placeholder="pierre.dupont@gmail.com"
                    value={email}
                    title={'E-mail'}
                    onChangeText={(text) => { onEmailChange(text) }}
                    errorText={emailErrorText}
                />
            </View>
            <Button title="Suivant" backgroundColor={Colors.mainBlue} textColor={Colors.white}
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