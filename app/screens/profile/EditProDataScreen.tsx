import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import Colors from '@/app/constants/Colors';
import Button from '@/app/components/atoms/Button';
import DropDown from '@/app/components/molecules/DropDown';
import InputField from '@/app/components/molecules/InputField';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import { showMessage } from 'react-native-flash-message';
import DateTimePicker from '@react-native-community/datetimepicker';
import Languages from '@/app/constants/Languages';
import { userService } from '@/app/services/user.service';
import Title1 from '@/app/components/atoms/Title1';
import Title2 from '@/app/components/atoms/Title2';
import SmallText from '@/app/components/atoms/SmallText';
import AgentSpecialities from '@/app/constants/AgentSpecialities';
import BodyText from '@/app/components/atoms/BodyText';
import PlusMinusInput from '@/app/components/molecules/PlusMinusInput';


type Props = NativeStackScreenProps<ProfileNavParams, 'EditProData'>;

export default function EditProDataScreen({ navigation, route }: Props) {

    const [network, setNetwork] = useState(route.params.user.agentProperties?.network!);
    const [verifId, setVerifId] = useState(route.params.user.agentProperties?.verifId!);
    const [workStatus, setWorkStatus] = useState(route.params.user.agentProperties?.workStatus!);
    const [specialities, setSpecialities] = useState(route.params.user.agentProperties?.specialities || []);
    const [experience, setExperience] = useState(route.params.user.agentProperties?.experience!);
    const [url, setUrl] = useState(route.params.user.agentProperties?.url!);

    const save = () => {
        if (!network || network === '' || workStatus === -1 || specialities.length === 0) {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez renseigner tous les champs',
                type: 'warning',
            })
            return;
        }
        let _user = {
            ...route.params.user,
            agentProperties: {
                ...route.params.user.agentProperties,
                network,
                verifId,
                workStatus,
                specialities,
                experience,
                url
            }
        }
        userService.update({ user: _user })
            .then((response) => {
                showMessage({
                    message: 'Succès',
                    description: 'Vos informations ont été mises à jour',
                    type: 'success',
                })
                navigation.goBack();
            })
            .catch((error) => {
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue lors de la mise à jour de vos informations',
                    type: 'danger',
                })
            })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24, marginTop: 20, paddingBottom: 130 }}>
                <Title0 title={'Informations professionnelles'} isLeft />
                <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 50 }}>
                    <View style={{ gap: 10 }} >
                        <Title2 title={'Réseau professionnel'} isLeft />
                        <InputField
                            title="Réseau"
                            placeholder='IAD'
                            value={network || ''}
                            onChangeText={(text) => setNetwork(text)} />
                    </View>
                    <View style={{ gap: 10 }} >
                        <Title2 title={'Statut professionnel'} isLeft />
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
                            <Title2 title={'Vérification du statut professionnel'} isLeft />
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

                    <View style={{ gap: 10 }} >
                        <Title2 title={'Statut professionnel'} isLeft />
                        <DropDown
                            title="Spécialités"
                            placeholder={
                                specialities.length === 0 ?
                                    'Selectionnez vos spécialités'
                                    : specialities.length === 1 ?
                                        '1 spécialité sélectionnée'
                                        : `${specialities.length} spécialités sélectionnées`
                            }
                            value={-1}
                            type='checkbox'
                            items={AgentSpecialities.specialities}
                            onSelectItem={(item) => {
                                if (specialities.includes(item.id)) {
                                    setSpecialities(specialities.filter(id => id !== item.id));
                                }
                                else {
                                    setSpecialities([...specialities, item.id]);
                                }
                            }}
                            selectedItemIds={specialities}
                        />
                        <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <BodyText text={'Nombre d’années d’expérience'} isMedium style={{ width: '50%' }} />
                            <PlusMinusInput
                                value={experience}
                                minVal={0}
                                maxVal={50}
                                onChangeValue={(text) => setExperience(text)}
                            />
                        </View>
                        <View style={{ gap: 10 }} >
                            <Title2 title={'Site web'} isLeft />
                            <InputField
                                title="URL"
                                placeholder='https://www.pierrerealestate.com'
                                value={url || ''}
                                onChangeText={(text) => setUrl(text)} />
                        </View>
                    </View>

                </ScrollView>

            </View>
            <Button title="Enregistrer" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                style={styles.saveBtn}
                onPress={save} />


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
    saveBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
    }
})