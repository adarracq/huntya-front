import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AllDaysEvents from './components/AllDaysEvents';
import CalendarPage from './components/CalendarPage';
import { useIsFocused } from '@react-navigation/native';
import { CalendarNavParams } from '@/app/navigations/CalendarNav';
import Colors from '@/app/constants/Colors';
import { eventService } from '@/app/services/event.service';
import { UserContext } from '@/app/contexts/UserContext';
import TopMenus from '@/app/components/molecules/TopMenus';
import Title1 from '@/app/components/atoms/Title1';
import Title0 from '@/app/components/atoms/Title0';
import IconButton from '@/app/components/molecules/IconButton';
import Event from '@/app/models/Event';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import NewEventDrawer from './components/NewEventDrawer';
import { userService } from '@/app/services/user.service';
import User from '@/app/models/User';
import UserPublic from '@/app/models/UserPublic';

type Props = NativeStackScreenProps<CalendarNavParams, 'HomeCalendar'>;

export default function CalendarScreen({ navigation, route }: Props) {

    const [isList, setIsList] = useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [user, setUser] = useContext(UserContext);
    const [userData, setUserData] = useState<User>();
    const [friends, setFriends] = useState<UserPublic[]>([]);
    const isFocused = useIsFocused();
    const [openNewEvent, setOpenNewEvent] = useState(false);
    const [loading, setLoading] = useState(false);

    function getEvents() {
        setLoading(true);
        eventService.getEventsByUserEmail(user.email)
            .then((events: Event[]) => {
                setLoading(false);
                setEvents(events);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }

    function getFriends() {
        setLoading(true);
        userService.getByEmail(user.email)
            .then((user) => {
                setLoading(false);
                // add user to friends
                let friends = [
                    user,
                    user,
                    user,
                    user,
                    user,
                    user,
                    user,
                ]
                //setFriends(friends);
                setUserData(user);
                setFriends(user.friends);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    useEffect(() => {
        getFriends();
        getEvents();
    }, [isFocused])

    return (
        <View style={styles.container}>
            <View style={styles.topInfos}>
                <Title0 title="Calendrier" />
                <IconButton
                    icon='plus'
                    backgroundColor={Colors.mainBlue}
                    iconColor={Colors.white}
                    onPress={() => setOpenNewEvent(!openNewEvent)}
                />
            </View>
            <TopMenus
                leftText="Calendrier"
                rightText="Liste"
                leftIcon='calendar'
                rightIcon='list'
                selectedId={isList ? 1 : 0}
                onPressLeft={() => setIsList(false)}
                onPressRight={() => setIsList(true)}
            />
            {
                userData &&
                (
                    isList ?
                        <AllDaysEvents
                            user={userData}
                            friends={friends}
                            events={events}
                            onUpdateOrDelete={getEvents}
                        />
                        :
                        <CalendarPage
                            user={userData}
                            friends={friends}
                            events={events}
                            onUpdateOrDelete={getEvents}
                        />
                )
            }
            {
                loading &&
                <LoadingScreen />
            }
            {userData &&
                <NewEventDrawer
                    open={openNewEvent}
                    friends={friends}
                    user={userData}
                    onValidate={getEvents}
                />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingTop: 50,
        gap: 24
    },
    topInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})