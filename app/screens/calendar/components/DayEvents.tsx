import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '@/app/constants/Colors'
import { UserContext } from '@/app/contexts/UserContext'
import Event from '@/app/models/Event'
import EventDetails from '@/app/constants/EventDetails'
import Title1 from '@/app/components/atoms/Title1'
import BodyText from '@/app/components/atoms/BodyText'
import Title2 from '@/app/components/atoms/Title2'
import GuestDisplay from './GuestDisplay'
import NewEventDrawer from './NewEventDrawer'
import User from '@/app/models/User'
import UserPublic from '@/app/models/UserPublic'
type Props = {
    date: string,
    events: Event[],
    friends: UserPublic[],
    user: User,
    onUpdateOrDelete: () => void,
}

export default function DayEvents(props: Props) {
    const [user, setUser] = useContext(UserContext);
    const [openEditEvent, setOpenEditEvent] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event>();

    function editEvent(event: Event) {
        setOpenEditEvent(!openEditEvent);
        setSelectedEvent(event);
    }

    return (
        <View style={styles.container}>
            <Title1 title={props.date} isLeft style={{ marginBottom: 16 }} />
            {
                props.events.map((event, index) => (
                    <TouchableOpacity
                        onPress={() => editEvent(event)}
                        key={index}
                    >
                        <View style={styles.event}>
                            <BodyText text={props.date + ' - ' + event.hour} color={Colors.darkGrey} />
                            <Title2 title={EventDetails.types[event.type].label} />
                            {
                                event.guests.map((guest, index) => (
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }} key={index}>
                                        <Image source={{ uri: guest.imageUrl ?? '' }} style={styles.image} />

                                        <View style={{ alignItems: 'flex-start' }}>
                                            <BodyText text={guest.firstname ?? ''} isBold />
                                            <BodyText text={'Voir le profil'} color={Colors.mainBlue} />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                    </TouchableOpacity>
                ))
            }

            <NewEventDrawer
                open={openEditEvent}
                friends={props.friends}
                user={props.user}
                edit={selectedEvent}
                onValidate={() => {
                    setOpenEditEvent(false)
                    props.onUpdateOrDelete()
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginBottom: 12,
    },
    event: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 12,
        borderRadius: 12,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        marginBottom: 12,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 200,
        backgroundColor: Colors.darkGrey,
    }
})