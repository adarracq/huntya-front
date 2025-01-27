import Button from '@/app/components/atoms/Button';
import Colors from '@/app/constants/Colors';
import React from 'react'
import { showMessage } from 'react-native-flash-message';

export default function AppleSignIn() {

    function loginWithApple() {
        showMessage({
            message: 'Erreur',
            description: 'Fonctionnalité non disponible pour le moment',
            type: 'warning',
        });
    }

    return (
        <Button title="Continuer avec Apple" backgroundColor={Colors.white} icon="apple"
            onPress={loginWithApple} />
    )
}