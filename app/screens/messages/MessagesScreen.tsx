import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { Component, useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ConversationHeading from './components/ConversationHeading';
import { useIsFocused } from '@react-navigation/native';
import { MessagesNavParams } from '@/app/navigations/MessagesNav';
import { UserContext } from '@/app/contexts/UserContext';
import Conversation from '@/app/models/Conversation';
import { convService } from '@/app/services/conv.service';
import { userService } from '@/app/services/user.service';
import io from 'socket.io-client';
import { functions } from '@/app/utils/Functions';
import BodyText from '@/app/components/atoms/BodyText';
import Colors from '@/app/constants/Colors';
import Title0 from '@/app/components/atoms/Title0';
import User from '@/app/models/User';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';

type Props = NativeStackScreenProps<MessagesNavParams, 'Home'>;

export default function MessagesScreen({ navigation, route }: Props) {

    const [user, setUser] = useContext(UserContext);
    const [userData, setUserData] = useState<User | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const socket = io(process.env.EXPO_PUBLIC_DEV_API_URL);

    // first get user
    function getUserAndConvs() {
        setLoading(true);
        userService.getByEmail(user.email)
            .then((user: User) => {
                setUserData(user);
                if (user._id) {
                    convService.getUserConvs(user._id)
                        .then((data) => {
                            getConvNameAndPicture(data);
                            setLoading(false);
                        })
                        .catch((error) => {
                            console.log(error);
                            setLoading(false);
                        });
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }


    async function getConvNameAndPicture(convs: Conversation[]) {
        if (!userData) return;
        const updatedConvs = await Promise.all(
            convs.map(async (conversation) => {
                if (!conversation.name || !conversation.picture) {
                    const otherUserId = conversation.participants.find((id) => id !== userData._id);
                    if (!otherUserId) return conversation;

                    try {
                        const user = await userService.getById(otherUserId);
                        conversation.name = user.firstname;
                        conversation.picture = user.imageUrl;
                    } catch (error) {
                        console.log(error);
                    }
                }
                return conversation;
            })
        );
        setConversations(orderConversations(updatedConvs));
    }

    function orderConversations(conversations: Conversation[]) {
        return conversations.sort((a, b) => {
            let dateA = new Date(a.messages[a.messages.length - 1].date).getTime();
            let dateB = new Date(b.messages[b.messages.length - 1].date).getTime();
            return dateB - dateA;
        });
    }

    function goToChat(conversation: Conversation) {
        if (!userData) return;
        let otherUserId = conversation.participants.find((id) => id !== userData._id);
        if (!otherUserId) return '';
        userService.getById(otherUserId)
            .then((user) => {
                navigation.navigate('Chat', {
                    withUser: user,
                    user: userData
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {
        getUserAndConvs();
        socket.on('receiveMessage', (message) => {
            getUserAndConvs();
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [isFocused, user]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', padding: 20 }}>
                <Title0 title="Messages" />
                <Title0 title={' (' + conversations.length + ')'} color={Colors.mainBlue} />
            </View>
            <ScrollView contentContainerStyle={{ rowGap: 10 }}>
                {userData && conversations.map((conversation, index) => {
                    return (
                        <ConversationHeading
                            key={index}
                            name={conversation.name ? conversation.name : ''}
                            picture={conversation.picture ? conversation.picture : 'https://picsum.photos/200/300'}
                            lastMessage={conversation.messages[conversation.messages.length - 1].text.length > 15 ?
                                conversation.messages[conversation.messages.length - 1].text.substring(0, 15) + '...'
                                : conversation.messages[conversation.messages.length - 1].text}
                            lastMessageDate={functions.getStringDateDifference2(conversation.messages[conversation.messages.length - 1].date)}
                            isRead={conversation.read ? true : conversation.messages[conversation.messages.length - 1].senderId === userData._id}
                            onPress={() => goToChat(conversation)}
                        />
                    )
                })}
                {
                    conversations.length === 0 &&
                    <BodyText
                        text="Aucun message"
                        color={Colors.darkGrey}
                    />
                }
            </ScrollView>
            {
                loading && <LoadingScreen />
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: 30
    },
})