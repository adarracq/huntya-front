import Button from '@/app/components/atoms/Button';
import Colors from '@/app/constants/Colors';
import React from 'react'
import { showMessage } from 'react-native-flash-message';

export default function FacebookSignIn() {

    function loginWithFacebook() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'danger',
        });
    }

    return (
        <Button title="Continuer avec Facebook" backgroundColor={Colors.white} icon="facebook"
            onPress={loginWithFacebook} />
    )
}