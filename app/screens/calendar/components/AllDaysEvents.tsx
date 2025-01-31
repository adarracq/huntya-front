import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import DayEvents from './DayEvents'
import { functions } from '@/app/utils/Functions'
import Colors from '@/app/constants/Colors'
import Event from '@/app/models/Event'
import User from '@/app/models/User'
import UserPublic from '@/app/models/UserPublic'

type Props = {
    events: Event[],
    friends: UserPublic[],
    user: User,
    onUpdateOrDelete: () => void,
}

export default function AllDaysEvents(props: Props) {

    const [daysEvents, setDaysEvents] = React.useState<Event[][]>([]);

    function groupEventsByDay() {
        let _daysEvents: Event[][] = [];
        props.events.forEach(event => {
            let index = _daysEvents.findIndex(dayEvents => functions.dateToString(dayEvents[0].date) === functions.dateToString(event.date));

            if (index === -1) {
                _daysEvents.push([event]);
            } else {
                _daysEvents[index].push(event);
            }
        });
        setDaysEvents(_daysEvents);
    }

    useEffect(() => {
        groupEventsByDay();
    }, [props.events]);


    return (
        <ScrollView style={styles.container}>
            {
                daysEvents.reverse().map((dayEvents, index) => (
                    <DayEvents
                        key={index}
                        date={functions.dateToStringWithDayOfWeek(dayEvents[0].date,)}
                        friends={props.friends}
                        user={props.user}
                        events={dayEvents.reverse()}
                        onUpdateOrDelete={props.onUpdateOrDelete}
                    />
                ))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: Colors.white,
    },
})