import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { StyleSheet } from 'react-native';
import Colors from '@/app/constants/Colors';
import ProgressBar from '@/app/components/molecules/ProgressBar';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import Button from '@/app/components/atoms/Button';
import SearchAddress from '@/app/components/organisms/SearchAddress';
import Coordinates from '@/app/models/Coordinates';
import BodyText from '@/app/components/atoms/BodyText';
import Title2 from '@/app/components/atoms/Title2';

type Props = NativeStackScreenProps<ProfileNavParams, 'NewProject1Zone'>;
export default function NewProject1ZoneScreen({ navigation, route }: Props) {
    const [address, setAddress] = useState('');
    const [coords, setCoords] = useState<Coordinates | null>(null);

    const selectAddress = (coords: Coordinates, address: any) => {
        setAddress(address.description);
        setCoords(coords);
        console.log('address', address);
    }

    const next = () => {
        let project = route.params.project;
        project.addressString = address;
        project.coords = coords;
        navigation.navigate('NewProject2Details', { project: project });
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={{ gap: 24 }}>
                <ProgressBar progress={2} total={4} title="Zone" width={80} />
                <Title0 title={'Quelle est votre zone de recherche ?'} isLeft />
                <SearchAddress
                    onSelectAddress={selectAddress}
                    isSearching={(isSearching) => console.log('isSearching', isSearching)}
                    searchBarStyle={{
                        position: 'static',
                        padding: 0
                    }}
                />
                {
                    address &&
                    <>
                        <Title2 title="Adresse sélectionnée :" isLeft />
                        <View style={styles.lineContainer}>
                            <View style={styles.iconContainer}>
                                <Image source={functions.getIconSource('marker-home')} style={styles.icon} />
                            </View>
                            <BodyText text={address} style={{
                                flex: 1,
                                flexWrap: 'wrap'
                            }} isMedium />
                        </View>
                    </>
                }

            </View>
            <Button title="Suivant" onPress={next}
                disabled={!address || address == ''}
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                style={styles.nextBtn}
            />

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
    nextBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: Colors.veryLightGrey,
        padding: 12,
        borderRadius: 12
    },
    iconContainer: {
        backgroundColor: Colors.lightBlue,
        padding: 10,
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.mainBlue
    }
})