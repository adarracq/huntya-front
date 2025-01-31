import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Colors from '@/app/constants/Colors';
import Title1 from '@/app/components/atoms/Title1';
import User from '@/app/models/User';
import SmallText from '@/app/components/atoms/SmallText';
import Button from '@/app/components/atoms/Button';
import DropDown from '@/app/components/molecules/DropDown';
import EventDetails from '@/app/constants/EventDetails';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '@/app/components/molecules/InputField';
import AddGuestDrawer from './AddGuestDrawer';
import GuestDisplay from './GuestDisplay';
import { showMessage } from 'react-native-flash-message';
import { eventService } from '@/app/services/event.service';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import Event from '@/app/models/Event';
import { functions } from '@/app/utils/Functions';
import Title2 from '@/app/components/atoms/Title2';
import UserPublic from '@/app/models/UserPublic';

type Props = {
    open: boolean;
    friends: UserPublic[];
    user: User;
    edit?: Event;
    onValidate: () => void;
}
export default function NewEventDrawer(props: Props) {
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const [selectedType, setSelectedType] = useState(-1);
    const [selectedGuests, setSelectedGuests] = useState<UserPublic[]>([]);
    const [date, setDate] = useState(new Date());
    const [dateString, setDateString] = useState('');
    const [openDate, setOpenDate] = useState(false)
    const [hour, setHour] = useState<string>('');
    const [openHour, setOpenHour] = useState(false);
    const [loading, setLoading] = useState(false);

    function createEvent() {
        if (selectedType === -1 || dateString === '' || hour === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez remplir tous les champs',
                type: 'warning',
            });
            return;
        }
        // create event
        setLoading(true);
        let event = {
            date,
            type: selectedType,
            asker: {
                email: props.user.email,
                firstname: props.user.firstname,
                lastname: props.user.lastname,
                imageUrl: props.user.imageUrl
            },
            guests: selectedGuests,
            hour,
            status: 'pending'
        };
        eventService.createEvent(event)
            .then(() => {
                showMessage({
                    message: 'Succès',
                    description: 'Rendez-vous créé avec succès',
                    type: 'success',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
                props.onValidate();
                // TODO send notification to guests
            })
            .catch((error) => {
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Erreur lors de la création du rendez-vous',
                    type: 'danger',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
            });
    }

    function updateEvent() {
        if (selectedType === -1 || dateString === '' || hour === '') {
            showMessage({
                message: 'Erreur',
                description: 'Veuillez remplir tous les champs',
                type: 'warning',
            });
            return;
        }
        // update event
        setLoading(true);
        let event = {
            id: props.edit?._id,
            date,
            type: selectedType,
            guests: selectedGuests,
            hour,
            status: 'pending'
        };
        if (!props.edit?._id) return;
        eventService.updateEvent(props.edit._id, event)
            .then((event) => {
                console.log(event);
                showMessage({
                    message: 'Succès',
                    description: 'Rendez-vous modifié avec succès',
                    type: 'success',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
                props.onValidate();
                // TODO send notification to guests
            })
            .catch((error) => {
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Erreur lors de la modification du rendez-vous',
                    type: 'danger',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
            });
    }

    function deleteEvent() {
        setLoading(true);
        if (!props.edit?._id) return;
        eventService.delete(props.edit?._id)
            .then(() => {
                showMessage({
                    message: 'Succès',
                    description: 'Rendez-vous supprimé avec succès',
                    type: 'success',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
                props.onValidate();
                // TODO send notification to guests
            })
            .catch((error) => {
                console.log(error);
                showMessage({
                    message: 'Erreur',
                    description: 'Erreur lors de la suppression du rendez-vous',
                    type: 'danger',
                });
                actionSheetRef.current?.hide();
                setLoading(false);
            });
    }


    // if edit mode, fill fields with event data
    useEffect(() => {
        if (props.edit) {
            console.log(props.edit.date);
            setSelectedType(props.edit.type);
            setDate(new Date(props.edit.date));
            setDateString(functions.dateToString(props.edit.date));
            setHour(props.edit.hour);
            setSelectedGuests(props.edit.guests);
        }
    }, [props.edit])

    // open the action sheet 
    useEffect(() => {
        if (props.open)
            actionSheetRef.current?.show();
    }, [props.open])

    return (
        <ActionSheet ref={actionSheetRef}
            containerStyle={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                backgroundColor: Colors.white,
            }}>
            <View style={{ paddingHorizontal: 20, paddingVertical: 35, gap: 24 }}>
                <Title1 title={
                    props.edit ?
                        "Editer l'événement"
                        :
                        "Créer un nouveau rendez-vous"
                } isLeft />

                <View style={{ gap: 16 }}>
                    <AddGuestDrawer
                        friends={props.friends}
                        onSelectFriend={(friend) => {
                            let newGuests = selectedGuests;
                            if (newGuests.find(g => g.email === friend.email)) {
                                newGuests = newGuests.filter(g => g.email !== friend.email);
                            } else {
                                newGuests.push(friend);
                            }
                            setSelectedGuests(newGuests);
                            // we add selected value to friend array
                            props.friends.map(f => {
                                if (f.email === friend.email) {
                                    f.selected = !f.selected;
                                }
                            })
                        }}
                    />
                    {
                        selectedGuests.map((guest, index) => (
                            <GuestDisplay
                                guest={guest}
                                key={index}
                                onRemove={() => {
                                    let newGuests = selectedGuests.filter(g => g.email !== guest.email);
                                    setSelectedGuests(newGuests);
                                    // we remove selected value to friend array
                                    props.friends.map(f => {
                                        if (f.email === guest.email) {
                                            f.selected = !f.selected;
                                        }
                                    })
                                }}
                            />
                        ))
                    }

                    <SmallText text="Détails du rendez-vous" isLeft />
                    <DropDown
                        placeholder="Motif du rendez-vous"
                        title="Type de rendez-vous"
                        value={selectedType}
                        items={EventDetails.types}
                        onSelectItem={(item) => setSelectedType(item.id)}
                        type='radio'
                    />
                    <InputField
                        title="Date du rendez-vous"
                        placeholder="24/03/2026"
                        value={dateString}
                        onChangeText={() => setOpenDate(true)}
                        onFocus={() => setOpenDate(true)}
                    />
                    <InputField
                        title="Heure du rendez-vous"
                        placeholder="14:30"
                        value={hour}
                        onChangeText={() => setOpenHour(true)}
                        onFocus={() => setOpenHour(true)}
                    />

                </View>

                {
                    props.edit ?
                        <>
                            <Button
                                title="Modifier"
                                backgroundColor={Colors.mainBlue}
                                textColor={Colors.white}
                                onPress={updateEvent}
                            />
                            <TouchableOpacity
                                onPress={deleteEvent}
                            >
                                <Title2 title="Supprimer l'évenement" color={Colors.mainRed} />
                            </TouchableOpacity>
                        </>
                        :
                        <Button
                            title="Valider"
                            backgroundColor={Colors.mainBlue}
                            textColor={Colors.white}
                            onPress={createEvent}
                        />

                }


            </View>
            {
                loading && <LoadingScreen />
            }
            {
                openDate && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpenDate(false);
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

            {
                openHour && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="spinner"
                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || date;
                            setOpenHour(false);
                            setDate(currentDate);
                            let hour = currentDate.getHours().toString();
                            let minute = currentDate.getMinutes().toString();
                            if (hour.length === 1)
                                hour = "0" + hour;

                            if (minute.length === 1)
                                minute = "0" + minute;

                            let stringHour = hour + ":" + minute;
                            setHour(stringHour);
                        }}
                    />
                )
            }

        </ActionSheet >
    )
}