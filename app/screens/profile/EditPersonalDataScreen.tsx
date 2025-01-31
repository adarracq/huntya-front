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


type Props = NativeStackScreenProps<ProfileNavParams, 'EditPersonalData'>;

export default function EditPersonalDataScreen({ navigation, route }: Props) {
    const user = route.params.user;
    const [firstname, setFirstname] = useState(route.params.user.firstname);
    const [lastname, setLastname] = useState(route.params.user.lastname);
    const [gender, setGender] = useState(route.params.user.gender!);
    const [dateString, setDateString] = useState(route.params.user.birthdate ? functions.dateToString(route.params.user.birthdate) : '');
    const [date, setDate] = useState(route.params.user.birthdate ? new Date(route.params.user.birthdate) : new Date());
    const [open, setOpen] = useState(false);
    const [presentation, setPresentation] = useState(route.params.user.presentation || '');
    const [languages, setLanguages] = useState(route.params.user.languages || []);

    const save = () => {
        if (firstname == '' || lastname == '' || dateString == '' || gender == -1) {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez renseigner tous les champs',
                type: 'warning',
            })
            return;
        }
        let user = { ...route.params.user };
        user.firstname = firstname;
        user.lastname = lastname;
        user.birthdate = date;
        user.gender = gender;
        user.languages = languages;
        user.presentation = presentation;

        userService.update({ user })
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
                <Title0 title={'Informations personnelles'} isLeft />
                <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 20 }}>
                    <InputField
                        title="Prénom"
                        placeholder='Pierre'
                        value={firstname || ''}
                        onChangeText={(text) => setFirstname(text)} />
                    <InputField
                        title="Nom"
                        placeholder='Dupont'
                        value={lastname || ''}
                        onChangeText={(text) => setLastname(text)} />
                    <InputField
                        title="Date de naissance"
                        placeholder="14/03/1990"
                        value={dateString}
                        onChangeText={() => setOpen(true)}
                        onFocus={() => setOpen(true)}
                    />
                    <DropDown
                        title="Genre"
                        placeholder="Selectionnez un genre"
                        value={gender}
                        type='radio'
                        items={[
                            { id: 0, label: 'Homme' },
                            { id: 1, label: 'Femme' },
                            { id: 2, label: 'Autre' },
                        ]}
                        onSelectItem={(item) => {
                            setGender(item.id);
                        }}
                    />
                    <InputField
                        title="Présentation"
                        placeholder='Ecrivez quelques mots pour vous présenter'
                        value={presentation || ''}
                        onChangeText={(text) => setPresentation(text)}
                        isMultiline
                        height={150}
                    />
                    <DropDown
                        title="Langues"
                        placeholder="Selectionnez les langues parlées"
                        value={-1}
                        type='checkbox'
                        items={Languages.languages}
                        onSelectItem={(item) => {
                            setLanguages([...languages, item.id]);
                        }}
                        selectedItemIds={languages}
                    />

                </ScrollView>

            </View>
            <Button title="Enregistrer" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                style={styles.saveBtn}
                onPress={save} />

            {
                open && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpen(false);
                            setDate(currentDate);
                            // add 0 to day and month if < 10
                            let day = currentDate.getDate().toString();
                            let month = (currentDate.getMonth() + 1).toString();
                            if (day.length === 1)
                                day = "0" + day;
                            if (month.length === 1)
                                month = "0" + month;

                            let stringDate = day
                                + "/" + month
                                + "/" + currentDate.getFullYear().toString();
                            setDateString(stringDate);
                        }}
                    />
                )
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
    saveBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
    }
})