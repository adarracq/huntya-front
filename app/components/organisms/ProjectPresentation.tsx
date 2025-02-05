import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollViewBase, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Project from '@/app/models/Project';
import Colors from '@/app/constants/Colors';
import { functions } from '@/app/utils/Functions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ProjectDetails from '@/app/constants/ProjectDetails';
import BodyText from '../atoms/BodyText';
import Title0 from '../atoms/Title0';
import UserSeeprofileBtn from '../molecules/UserSeeprofileBtn';
import ProjectRoomEct from './ProjectRoomEct';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../atoms/Button';

type Props = {
    project: Project;
    onBack: () => void;
    onSendMessage: () => void;
    onSeeProfile: () => void;
}
export default function ProjectPresentation(props: Props) {
    const [coords, setCoords] = useState({ latitude: 48.856614, longitude: 2.3522219 });
    const mapRef = useRef<MapView>(null);


    useEffect(() => {
        if (props.project.coords) {
            setCoords({
                latitude: props.project.coords.latitude,
                longitude: props.project.coords.longitude
            });
            mapRef.current?.animateToRegion({
                latitude: props.project.coords.latitude,
                longitude: props.project.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }, 2000);
        }
    }, [props.project.coords]);



    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onBack} style={{ position: 'absolute', top: 30, left: 20, zIndex: 2 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={styles.mapContainer}>
                {props.project.coords &&
                    <MapView style={styles.map}
                        ref={mapRef}
                        initialRegion={{
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: coords.latitude,
                                longitude: coords.longitude,
                            }}
                            title=""
                            description=""
                        >
                            <Image
                                source={functions.getIconSource('marker-project')}
                                style={{ width: 40, height: 40 }}
                                resizeMode="contain"
                            />
                        </Marker>
                    </MapView>
                }
            </View>
            <ScrollView contentContainerStyle={{ gap: 24, marginTop: 24, paddingBottom: 100 }}>

                <View style={{ gap: 12, paddingHorizontal: 20 }}>
                    <View style={{
                        borderRadius: 100,
                        backgroundColor: ProjectDetails.types[props.project.type].color,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                    }}>
                        <BodyText text={ProjectDetails.types[props.project.type].label2} color={Colors.white} isMedium />
                    </View>
                    <Title0 title={props.project.addressString || 'Adresse inconnue'} isLeft />
                    {props.project.date && <BodyText text={functions.getStringDateDifference(props.project.date)} color={Colors.darkGrey} />}
                    <UserSeeprofileBtn
                        imageUrl={props.project.user_imageUrl ?? ''}
                        firstname={props.project.user_firstname}
                        onPress={props.onSeeProfile}
                    />
                </View>
                <View style={styles.presContainer}>
                    <Image source={functions.getIconSource('quotes')} style={{ width: 40, height: 40, }} />
                    <BodyText text={props.project.description} isItalic />
                </View>
                <ProjectRoomEct project={props.project} />

            </ScrollView>
            <Button
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                title="Envoyer un message"
                onPress={props.onSendMessage}
                style={styles.nextBtn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    mapContainer: {
        height: 200,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    presContainer: {
        backgroundColor: Colors.lightBlue,
        padding: 20,
        gap: 8,
    },
    nextBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
        width: Dimensions.get('window').width - 40,
    },
})