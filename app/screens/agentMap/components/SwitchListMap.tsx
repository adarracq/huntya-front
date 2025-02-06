import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';

type Props = {
    isList: boolean;
    onSwitch: () => void;
}

export default function SwitchListMap(props: Props) {

    const [isList, setIsList] = React.useState(props.isList);

    return (
        <View style={{
            position: 'absolute',
            top: 40,
            right: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
        }}>
            <TouchableOpacity
                onPress={() => {
                    if (isList) {
                        setIsList(false);
                        props.onSwitch();
                    }
                }}
                style={{
                    backgroundColor: !isList ? Colors.mainBlue : Colors.white,
                    height: 50,
                    width: 50,
                    borderColor: Colors.mainBlue,
                    borderWidth: 1,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={functions.getIconSource('map2')}
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: !isList ? Colors.white : Colors.darkGrey
                    }} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    if (!isList) {
                        setIsList(true);
                        props.onSwitch();
                    }
                }}
                style={{
                    backgroundColor: isList ? Colors.mainBlue : Colors.white,
                    height: 50,
                    width: 50,
                    borderColor: Colors.mainBlue,
                    borderWidth: 1,
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={functions.getIconSource('list')}
                    style={{
                        width: 16,
                        height: 16,
                        tintColor: isList ? Colors.white : Colors.darkGrey
                    }} />
            </TouchableOpacity>
        </View>
    )
}