import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import InputField from '@/app/components/molecules/InputField';
import Button from '@/app/components/atoms/Button';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import Agent from '@/app/models/Agent';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<NavParams, 'SetNetwork'>;
export default function SetNetworkScreen({ navigation, route }: Props) {

    const [network, setNetwork] = useState('');
    const [networkErrorText, setNetworkErrorText] = useState<string | null>(null);

    function onNetworkChange(text: string) {

        setNetwork(text);

        if (!text || text === '') {
            setNetworkErrorText('Veuillez entrer un réseau');
        }
        else {
            setNetworkErrorText(null);
        }
    }

    const next = () => {
        if (!network || network === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez entrer un réseau',
                type: 'warning',
            })
            return;
        }
        else {
            let user = { ...route.params.user };
            user.agentProperties = new Agent();
            user.agentProperties.network = network;
            navigation.navigate('SetStatus', { user });
        }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={5} total={9} title="Réseau" width={80} />
                <Title0 title={'Quel est votre réseau ?'} isLeft />
                <InputField placeholder="IAD"
                    value={network}
                    title={'Réseau'}
                    onChangeText={(text) => { onNetworkChange(text) }}
                    errorText={networkErrorText}
                />
            </View>
            <Button title="Suivant" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                onPress={next} />
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