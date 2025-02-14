import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { convService } from '@/app/services/conv.service';
import Colors from '@/app/constants/Colors';
import SmallText from '@/app/components/atoms/SmallText';
import BodyText from '@/app/components/atoms/BodyText';
import InputField from '@/app/components/molecules/InputField';
import { functions } from '@/app/utils/Functions';
import Message from '@/app/models/Message';
import User from '@/app/models/User';
import ChatHeading from '@/app/screens/messages/components/ChatHeading';
import NewEventDrawer from '@/app/screens/calendar/components/NewEventDrawer';
import Event from '@/app/models/Event';
import EventDetails from '@/app/constants/EventDetails';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title2 from '../atoms/Title2';
import ReportDrawer from '@/app/screens/messages/components/ReportDrawer';


type Props = {
    user: User;
    withUser: User;
    onSeeUserProfile: (user: User) => void;
    onSeeAgentProfile: (user: User) => void;
    onGoBack: () => void;
}

export default function Chat(props: Props) {

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const socket = io(process.env.EXPO_PUBLIC_DEV_API_URL);
    const [convId, setConvId] = useState(null);
    const [openNewEvent, setOpenNewEvent] = useState(false);
    const [openReport, setOpenReport] = useState(false);

    function onSendMessage() {
        if (currentMessage === '') return;
        socket.emit('sendMessage', {
            participants: [props.user._id, props.withUser._id],
            senderId: props.user._id,
            text: currentMessage,
        });

        /*convService.sendMessage({
            participants: [props.user._id, props.withUser._id],
            senderId: props.user._id,
            text: currentMessage,
        })
            .then(() => console.log('message sent'))
            .catch((error) => console.log(error));*/
        setCurrentMessage('');
    }

    function getMessages() {
        if (props.user._id && props.withUser._id) {
            convService.getConv(props.user._id, props.withUser._id)
                .then((data) => {
                    setMessages(data.messages.reverse());
                    setConvId(data._id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function onClickName() {
        if (props.withUser.type == 1) { // agent
            props.onSeeAgentProfile(props.withUser);
        } else {
            props.onSeeUserProfile(props.withUser);
        }
    }

    function addEvent(event: Event) {
        socket.emit('sendMessage', {
            participants: [props.user._id, props.withUser._id],
            senderId: props.user._id,
            text: 'Event',
            event: event
        });
    }




    useEffect(() => {
        getMessages();
        socket.on('receiveMessage', (message) => {
            getMessages();
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);



    useEffect(() => {
        if (convId)
            convService.readConv(convId).then(() => console.log('conv read')).catch((error) => console.log(error));
    }, [convId]);

    return (
        <View style={styles.container}>
            <ChatHeading
                user={props.withUser}
                onPressBack={() => props.onGoBack()}
                onPressCalendar={() => setOpenNewEvent(!openNewEvent)}
                onPressReport={() => setOpenReport(!openReport)}
                onClickName={onClickName}
            />

            <FlatList
                data={messages}
                inverted
                renderItem={({ item, index }) => (
                    <View style={{
                        flexDirection: 'column',
                        alignItems: props.user?._id === item.senderId ? 'flex-end' : 'flex-start',
                        padding: 10
                    }}>
                        {
                            // if different date from previous message, show date
                            index == 0 || new Date(messages[index - 1].date).toLocaleDateString() !== new Date(item.date).toLocaleDateString() ? (
                                <View style={{
                                    padding: 5,
                                    borderRadius: 5,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}>
                                    <SmallText
                                        text={new Date(item.date).toLocaleDateString()}
                                        color={Colors.darkGrey}
                                    />
                                </View>
                            ) : null
                        }
                        { // if is an event
                            item.event ? (
                                <View style={{
                                    borderRadius: 16,
                                    backgroundColor: Colors.lightBlue,
                                    padding: 20,
                                    paddingRight: 80,
                                    gap: 8
                                }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                        <AntDesign name="checkcircle" size={16} color={Colors.mainBlue} />
                                        <BodyText
                                            text={'Rendez-vous crée'}
                                            color={Colors.mainBlue}
                                            isMedium
                                        />
                                    </View>
                                    <Title2
                                        title={EventDetails.types[item.event.type].label}
                                        color={Colors.black}
                                        isLeft
                                    />
                                    <SmallText
                                        text={functions.dateToString2(item.event.date)}
                                        color={Colors.darkGrey}
                                        isLeft
                                    />
                                </View>
                            ) :
                                <View style={{
                                    borderRadius: 16,
                                    borderBottomRightRadius: props.user?._id === item.senderId ? 0 : 16,
                                    borderBottomLeftRadius: props.user?._id === item.senderId ? 16 : 0,
                                    backgroundColor: props.user?._id === item.senderId ? Colors.mainBlue : Colors.veryLightGrey,
                                    padding: 10
                                }}>
                                    <BodyText
                                        text={item.text}
                                        color={props.user?._id === item.senderId ? Colors.white : Colors.black}
                                    />
                                </View>
                        }
                        <SmallText
                            //get hour and minute from item.date
                            text={item.date.toLocaleString().substring(11, 16) + ' '}
                            color={Colors.darkGrey}
                        />
                    </View>
                )}
            />


            <View style={{
                padding: 10,
            }}>
                <InputField
                    title='Message'
                    placeholder="Message"
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    isMultiline={true}
                    noTitle
                />
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                        top: 28
                    }}
                    onPress={() => onSendMessage()}

                >
                    <Image
                        source={functions.getIconSource('send')}
                        style={{
                            width: 24,
                            height: 24,
                            tintColor: Colors.mainBlue,
                        }}
                    />
                </TouchableOpacity>
            </View>
            {
                <NewEventDrawer
                    open={openNewEvent}
                    friends={[]}
                    user={props.user}
                    withUser={props.withUser}
                    onValidate={(event) => addEvent(event)}
                />
            }
            {convId && props.user &&
                <ReportDrawer
                    open={openReport}
                    convID={convId}
                    user={props.user}
                />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
    },
})