import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import Colors from '@/app/constants/Colors';
import Button from '@/app/components/atoms/Button';
import InputField from '@/app/components/molecules/InputField';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import Title1 from '@/app/components/atoms/Title1';
import DropDown from '@/app/components/molecules/DropDown';
import SmallText from '@/app/components/atoms/SmallText';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<NavParams, 'SetStatus'>;
export default function SetStatusScreen({ navigation, route }: Props) {

    const [verifId, setVerifId] = useState('');
    const [workStatus, setWorkStatus] = useState(-1);

    function onVerifIdChange(text: string) {

        setVerifId(text);
    }



    const next = () => {
        if (workStatus === -1) {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez selectionner un statut',
                type: 'warning',
            })
            return;
        }
        let user = { ...route.params.user };
        if (user.agentProperties) {
            user.agentProperties.workStatus = workStatus;
            user.agentProperties.verifId = verifId;
        }
        navigation.navigate('SetExperience', { user: route.params.user });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={6} total={9} title="Statut" width={80} />
                <Title0 title={'Renseignez vos informations d’entreprise'} isLeft />
                <View style={{ gap: 10 }}>
                    <Title1 title={'Statut professionnel'} isLeft />
                    <DropDown
                        title="Statut"
                        placeholder="Selectionnez un statut"
                        value={workStatus}
                        type='radio'
                        items={[
                            { id: 0, label: 'Indépendant' },
                            { id: 1, label: 'Salarié' },
                        ]}
                        onSelectItem={(item) => {
                            setWorkStatus(item.id);
                        }}
                    />
                </View>
                {workStatus != -1 &&
                    <View style={{ gap: 10 }} >
                        <Title1 title={'Vérification du statut professionnel'} isLeft />
                        <InputField placeholder="123 456 789"
                            value={verifId}
                            title={'Numéro professionnel'}
                            onChangeText={setVerifId}
                        />
                        <SmallText
                            text={
                                workStatus == 0 ?
                                    "Indiquez votre numéro RSAC, SIREN ou SIRET."
                                    : workStatus == 1 ?
                                        "Indiquez le numéro SIRET/SIREN de l'agence."
                                        : ""
                            }
                            isLeft
                        />
                        <SmallText
                            text="Vous pouvez entrer cette information ultérieurement, elle sera validée par huntya et vous permettra d'avoir un profil certifié."
                            isLeft
                        />
                    </View>
                }
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