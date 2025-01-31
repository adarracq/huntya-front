import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import DayEvents from './DayEvents';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Event from '@/app/models/Event';
import Colors from '@/app/constants/Colors';
import SmallText from '@/app/components/atoms/SmallText';
import { functions } from '@/app/utils/Functions';
import User from '@/app/models/User';
import UserPublic from '@/app/models/UserPublic';

type Props = {
    events: Event[],
    friends: UserPublic[],
    user: User,
    onUpdateOrDelete: () => void,
}

export default function CalendarPage(props: Props) {

    const [selected, setSelected] = useState('');
    const [markedDates, setMarkedDates] = useState<any>({});
    const [eventsOnSelectedDay, setEventsOnSelectedDay] = useState<Event[]>([]);

    LocaleConfig.locales['fr'] = {
        monthNames: [
            'Janvier',
            'Février',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Août',
            'Septembre',
            'Octobre',
            'Novembre',
            'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
    };

    LocaleConfig.defaultLocale = 'fr';

    function addMarkedDates() {
        let markedDates: any = {};
        props.events.forEach(event => {
            // transform event.date (Date) to string AAAA-MM-JJ
            let date = event.date.toString().split('T')[0];
            markedDates[date] = { marked: true, dotColor: Colors.mainRed };
        });
        setMarkedDates(markedDates);
    }

    function onDayPress(day: any) {
        setSelected(day.dateString);
        // if there is event on this day, show them
        let eventsOnSelectedDay = props.events.filter(event => event.date.toString().split('T')[0] === day.dateString);

        setEventsOnSelectedDay(eventsOnSelectedDay);
    }

    useEffect(() => {
        addMarkedDates();
    }, [props.events]);


    return (
        <View style={styles.container}>
            <Calendar
                style={styles.calendar}
                onDayPress={(day: any) => {
                    onDayPress(day);
                }}
                markedDates={{
                    ...markedDates,
                    [selected]: { selected: true, selectedColor: Colors.mainBlue }
                }}
                theme={{
                    textSectionTitleColor: Colors.black,
                    selectedDayBackgroundColor: Colors.mainBlue,
                    selectedDayTextColor: Colors.white,
                    todayTextColor: Colors.mainBlueLight,
                    dayTextColor: Colors.black,
                    textDisabledColor: '#d9e1e8',
                    dotColor: Colors.mainRed,
                    selectedDotColor: Colors.mainRed,
                    arrowColor: Colors.mainBlue,
                    disabledArrowColor: Colors.lightGrey,
                    indicatorColor: Colors.mainBlue,
                    textDayFontFamily: 'title',
                    textMonthFontFamily: 'title-bold',
                    textDayHeaderFontFamily: 'title-bold',
                    textDayFontWeight: '600',
                    textDayHeaderFontWeight: '600',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12,
                    arrowStyle: {
                        color: Colors.mainBlue,
                        borderColor: Colors.mainBlue,
                        borderWidth: 1,
                        borderRadius: 12
                    }
                }}
            />
            {
                eventsOnSelectedDay.length === 0 ?
                    <View style={{ alignItems: 'center', marginTop: 32 }}>
                        <SmallText text='Aucun événement ce jour'></SmallText>
                    </View>
                    :
                    <ScrollView>
                        <DayEvents
                            date={functions.dateToStringWithDayOfWeek(eventsOnSelectedDay[0].date)}
                            events={eventsOnSelectedDay}
                            friends={props.friends}
                            user={props.user}
                            onUpdateOrDelete={props.onUpdateOrDelete}
                        />
                    </ScrollView>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingBottom: 104
    },
    calendar: {
        borderRadius: 16,
        paddingBottom: 8,
    }
})