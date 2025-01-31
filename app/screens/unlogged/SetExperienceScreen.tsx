import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavParams } from '@/app/navigations/UnloggedNav';
import Colors from '@/app/constants/Colors';
import Button from '@/app/components/atoms/Button';
import DropDown from '@/app/components/molecules/DropDown';
import Title1 from '@/app/components/atoms/Title1';
import Title0 from '@/app/components/atoms/Title0';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import { functions } from '@/app/utils/Functions';
import { showMessage } from 'react-native-flash-message';
import AgentSpecialities from '@/app/constants/AgentSpecialities';
import Title2 from '@/app/components/atoms/Title2';
import BodyText from '@/app/components/atoms/BodyText';
import PlusMinusInput from '@/app/components/molecules/PlusMinusInput';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { userService } from '@/app/services/user.service';

type Props = NativeStackScreenProps<NavParams, 'SetExperience'>;
export default function SetExperienceScreen({ navigation, route }: Props) {

    const specialities = AgentSpecialities.specialities;
    const [selectedSpecIds, setSelectedSpecIds] = useState<number[]>([]);
    const [experience, setExperience] = useState(0);
    const [loading, setLoading] = useState(false);



    const next = () => {

        let user = { ...route.params.user };
        if (user.agentProperties) {
            user.agentProperties.specialities = selectedSpecIds;
            user.agentProperties.experience = experience;
        }
        setLoading(true);
        userService.update({ user })
            .then((response) => {
                setLoading(false);
                navigation.navigate('SelectPlan', { email: route.params.user.email });
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Une erreur est survenue lors de la création du compte',
                    type: 'danger',
                })
            })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={7} total={9} title="Expérience" width={80} />
                <Title0 title={'Renseignez votre expérience'} isLeft />
                <View style={{ gap: 10 }}>
                    <Title1 title={'Spécialités'} isLeft />
                    <DropDown
                        title="Spécialités"
                        placeholder={
                            selectedSpecIds.length === 0 ?
                                'Selectionnez vos spécialités'
                                : selectedSpecIds.length === 1 ?
                                    '1 spécialité sélectionnée'
                                    : `${selectedSpecIds.length} spécialités sélectionnées`
                        }
                        value={-1}
                        type='checkbox'
                        items={specialities}
                        selectedItemIds={selectedSpecIds}
                        onSelectItem={(item) => {
                            if (selectedSpecIds.includes(item.id)) {
                                setSelectedSpecIds(selectedSpecIds.filter(id => id !== item.id));
                            }
                            else {
                                setSelectedSpecIds([...selectedSpecIds, item.id]);
                            }
                        }}
                    />
                </View>
                <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <BodyText text={'Nombre d’années d’expérience'} isMedium style={{ width: '50%' }} />
                    <PlusMinusInput
                        value={experience}
                        minVal={0}
                        maxVal={50}
                        onChangeValue={(text) => setExperience(text)}
                        style={{
                        }}
                    />
                </View>
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