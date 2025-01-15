import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { NavParams } from '@/app/navigations/UnloggedNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import Button from '@/app/components/atoms/Button';
import InputField from '@/app/components/molecules/InputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from '@/app/components/molecules/DropDown';
import { showMessage } from 'react-native-flash-message';

type Props = NativeStackScreenProps<NavParams, 'SetDetails'>;
export default function SetDetailsScreen({ navigation, route }: Props) {

    const user = route.params.user;
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState(-1);
    const [dateString, setDateString] = useState('');
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const next = () => {
        if (firstname == '' || lastname == '' || dateString == '' || gender == -1) {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez renseigner tous les champs',
                type: 'danger',
            })
            return;
        }
        let user = { ...route.params.user };
        user.firstname = firstname;
        user.lastname = lastname;
        user.birthdate = date;
        user.gender = gender;
        navigation.navigate('SetLanguages', { user });

    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 30 }}>
                <ProgressBar progress={3} title="Profil" width={80}
                    total={user.type === 0 ? 4 : 8}
                />
                <Title0 title={'Renseignez votre profil'} isLeft />
                <View style={{ gap: 16 }}>
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
                        items={[
                            { id: 0, label: 'Homme' },
                            { id: 1, label: 'Femme' },
                            { id: 2, label: 'Autre' },
                        ]}
                        onSelectItem={(item) => {
                            setGender(item.id);
                        }}
                    />

                </View>

            </View>
            <Button title="Suivant" backgroundColor={Colors.mainBlue} textColor={Colors.white}
                onPress={next} />

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
})