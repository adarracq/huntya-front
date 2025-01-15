import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors'
import Title0 from '@/app/components/atoms/Title0'
import Button from '@/app/components/atoms/Button'
import OrSeparator from '@/app/components/atoms/OrSeparator'
import GoogleSignIn from './components/GoogleSignIn'
import { showMessage } from 'react-native-flash-message'
import AppleSignIn from './components/AppleSignIn'
import FacebookSignIn from './components/FacebookSignIn'
import SmallText from '@/app/components/atoms/SmallText'
import { NavParams } from '@/app/navigations/UnloggedNav'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { LinearGradient } from 'expo-linear-gradient'

type Props = NativeStackScreenProps<NavParams, 'Login'>;
export default function LoginScreen({ navigation, route }: Props) {


    function loginWithEmail() {
        navigation.navigate('EmailInput');
    }
    return (
        <LinearGradient
            colors={[Colors.mainBlueDark, Colors.mainBlue, Colors.mainBlueLight]}
            style={styles.container}>
            <View style={{ gap: 20 }}>
                <Image source={require('../../assets/images/logo_white.png')}
                    style={styles.logo}
                />
                <Title0 title='Commencez dès maintenant à utiliser Huntya.' color={Colors.white} isLeft style={{ paddingRight: 80 }} />
            </View>
            <View style={{ gap: 20 }}>
                <Button title="Continuer avec votre e-mail"
                    backgroundColor={Colors.mainBlue}
                    textColor={Colors.white}
                    icon='mail'
                    style={{ borderColor: Colors.white, borderWidth: 2 }}
                    onPress={loginWithEmail} />
                <OrSeparator />
                <GoogleSignIn
                    onError={(error) => {
                        showMessage({
                            message: 'Erreur',
                            description: error,
                            type: 'danger',
                        });
                    }}
                    onSuccess={(response) => {
                        console.log(response);
                    }}
                />
                <AppleSignIn />
                <FacebookSignIn />
                <SmallText text="Si vous créez un nouveau compte, les conditions générales et la politique de confidentialité s'appliqueront." color={Colors.white} isItalic />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainBlue,
        padding: 20,
        paddingVertical: 60,
        justifyContent: 'space-between'
    },
    logo: {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 16
    }
})