import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import { StyleSheet } from 'react-native';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import RadioButton from '@/app/components/molecules/RadioButton';
import { showMessage } from 'react-native-flash-message';
import User from '@/app/models/User';

type Props = NativeStackScreenProps<NavParams, 'ChooseType'>;
export default function ChooseTypeScreen({ navigation, route }: Props) {

    const [type, setType] = useState<number>(-1);

    const next = () => {
        if (type === -1) {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez choisir un objectif',
                type: 'warning',
            })
            return;
        }
        // create a copy of route.params.user and update the type
        let user = { ...route.params.user };
        user.type = type;
        navigation.navigate('SetDetails', { user });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={2} total={4} title="Objectif" width={80} />
                <Title0 title={'Quel est votre objectif ?'} isLeft />
                <View style={{ gap: 16 }}>
                    <RadioButton
                        title="Particulier"
                        subtitle='Réalisez vos projets immobiliers'
                        icon='profile'
                        selected={type === 0}
                        onPress={() => setType(0)}
                    />
                    <RadioButton
                        title="Agent Immobilier"
                        subtitle='Développez votre activité'
                        icon='briefcase'
                        selected={type === 1}
                        onPress={() => setType(1)}
                    />
                </View>
            </View>
            <Button title="Suivant" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                onPress={next} />

            {/*
                loading && <LoadingScreen />
            */}
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