import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import User from '@/app/models/User';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import Title1 from '@/app/components/atoms/Title1';
import BodyText from '@/app/components/atoms/BodyText';


type Props = {
    user: User;
    onPressBack: () => void;
    onPressCalendar: () => void;
    onPressReport: () => void;
    onClickName: () => void;
}
export default function ChatHeading(props: Props) {

    function getName() {
        if (props.user.type == 1) { // agent
            return props.user.firstname + ' ' + props.user.lastname;
        } else {
            return props.user.firstname || '';
        }
    }

    function getUserType() {
        if (props.user.type == 0) { // user speak to agent
            return 'Particulier';
        }
        if (props.user.type == 1) { // agent
            return 'Agent';
        }
        else {
            return 'Particulierss';
        }
    }

    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: Colors.darkGrey,
                margin: 10,
                padding: 10,
                paddingTop: 20
            }}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={props.onPressBack}>
                    <Image
                        source={functions.getIconSource('arrow-left')}
                        style={{ width: 24, height: 24 }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <Image
                    source={{ uri: (process.env.EXPO_PUBLIC_DEV_API_URL || 'https://default-url.com') + props.user.imageUrl }}
                    style={{ width: 48, height: 48, borderRadius: 25 }}
                />
                <TouchableOpacity
                    onPress={props.onClickName}
                >
                    <Title1 title={getName()} />
                    <BodyText text={getUserType()} color={Colors.darkGrey} />
                </TouchableOpacity>
            </View>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity
                    onPress={props.onPressCalendar}
                    style={{
                        backgroundColor: Colors.mainBlue,
                        padding: 8,
                        borderRadius: 8,
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 3.05,
                        elevation: 4
                    }}>
                    <Image
                        source={functions.getIconSource('calendar')}
                        style={{ width: 24, height: 24, tintColor: Colors.white }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.onPressReport}
                    style={{
                        backgroundColor: Colors.white,
                        padding: 12,
                        borderRadius: 8,
                        shadowColor: "#000000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.17,
                        shadowRadius: 3.05,
                        elevation: 4
                    }}>
                    <Image
                        source={functions.getIconSource('dots')}
                        style={{ width: 16, height: 16, }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}