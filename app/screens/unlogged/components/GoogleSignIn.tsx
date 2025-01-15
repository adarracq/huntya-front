import Button from '@/app/components/atoms/Button';
import Colors from '@/app/constants/Colors';
import React from 'react'
import { showMessage } from 'react-native-flash-message';
//import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

type Props = {
    onSuccess: (userInfo: any) => void;
    onError: (error: string) => void;
};

/*GoogleSignin.configure({
    webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID',
});*/

export default function GoogleSignIn(props: Props) {

    function loginWithGoogle() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'danger',
        });
    }

    /*const handleGoogleSignIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            props.onSuccess(userInfo); // Pass the user info to the parent component
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                props.onError('Google Sign-In cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                props.onError('Google Sign-In is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                props.onError('Play services not available or outdated');
            } else {
                props.onError('Something went wrong with Google Sign-In: ' + error.message);
            }
        }
    };*/

    return (
        <Button title="Continuer avec Google" backgroundColor={Colors.white} icon="google"
            onPress={loginWithGoogle} />
    )
}