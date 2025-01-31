import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import Title0 from '@/app/components/atoms/Title0';
import BodyText from '@/app/components/atoms/BodyText';
import InputField from '@/app/components/molecules/InputField';
import { userService } from '@/app/services/user.service';
import { showMessage } from 'react-native-flash-message';
import SmallText from '@/app/components/atoms/SmallText';
import User from '@/app/models/User';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { UserContext } from '@/app/contexts/UserContext';

type Props = NativeStackScreenProps<NavParams, 'CheckEmailCode'>;
export default function CheckEmailCodeScreen({ navigation, route }: Props) {

    const email = route.params.email;
    const loginOrSignup = route.params.loginOrSignup;
    const [code, setCode] = React.useState('');
    const [codeErrorText, setCodeErrorText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [timerCount, setTimer] = useState(60);
    const [user, setUser] = useContext(UserContext);

    const onCodeChange = (text: string) => {
        setCode(text);
        if (!text || text === '') {
            setCodeErrorText('Veuillez entrer un code');
        }
        else if (text.length < 6) {
            setCodeErrorText('Veuillez entrer un code valide');
        }
        else {
            setCodeErrorText(null);
            setCode(text);
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 100000);

            userService.verifyEmailCode({ email, code: text })
                .then((response) => {
                    setLoading(false);
                    if (response.message) {
                        console.log(loginOrSignup);
                        if (loginOrSignup === 'login') {
                            setUser({
                                email: email,
                                type: response.type == 0 ? 'user' : 'agent'
                            });
                        }
                        else if (loginOrSignup === 'signup') {
                            let user = new User(email);
                            navigation.navigate('ChooseType', { user });
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    setCodeErrorText('Code invalide');
                })
        }
    }

    const resendEmailCode = () => {
        startInterval();
        setLoading(true);

        userService.loginOrSignup({ email: email })
            .then((res) => {
                setLoading(false);
                if (res.message) {
                    showMessage({
                        message: 'Code envoyé',
                        description: 'Verifiez votre boite e-mail',
                        type: 'success',
                    });
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

    const startInterval = () => {
        setTimer(60);
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                if (lastTimerCount == 0) {
                    //your redirection to Quit screen
                    return lastTimerCount;
                } else {
                    if (lastTimerCount <= 1) clearInterval(interval);
                    return lastTimerCount - 1;
                }
            })
        }, 1000) //each count lasts for a second
        //cleanup the interval on complete
        return () => clearInterval(interval)
    }

    useEffect(() => {
        startInterval();
    }, []);



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 20 }}>
                <View style={styles.mailContainer}>
                    <Image source={functions.getIconSource('mail')}
                        style={styles.mail}
                    />
                </View>
                <Title0 title='Verifiez vos e-mails' isLeft />
                <View>
                    <BodyText text='Entrez le code envoyé par e-mail à ' />
                    <BodyText text={email} isBold />
                </View>
                <InputField placeholder="000000"
                    value={code}
                    title={'Code'}
                    onChangeText={(text) => { onCodeChange(text) }}
                    errorText={codeErrorText}
                    keyBoardType='numeric'
                />
                {
                    timerCount > 0 &&
                    <SmallText text={`Renvoyer un code dans ${timerCount} secondes.`} isLeft />
                }
                {
                    timerCount <= 0 &&
                    <TouchableOpacity onPress={() => resendEmailCode()}>
                        <SmallText text='Renvoyer le code' color={Colors.mainBlue} isLeft />
                    </TouchableOpacity>
                }
            </View>
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
        paddingTop: 80,
        backgroundColor: Colors.white
    },
    mailContainer: {
        width: 60,
        height: 60,
        backgroundColor: Colors.lightBlue,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mail: {
        width: 30,
        height: 30,
        tintColor: Colors.mainBlue,
    }
})