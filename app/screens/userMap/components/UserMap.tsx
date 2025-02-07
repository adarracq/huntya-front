import { Image, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Zone from '@/app/models/Zone';
import { geoApiGouvService } from '@/app/services/geoApiGouv';
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';
import { zoneService } from '@/app/services/zone.service';
import Coordinates from '@/app/models/Coordinates';
import { showMessage } from 'react-native-flash-message';
import ZoneDisplayOnMap from '@/app/components/molecules/ZoneDisplayOnMap';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Project from '@/app/models/Project';
import User from '@/app/models/User';
import AgentsDrawer from './AgentsDrawer';
import BodyText from '@/app/components/atoms/BodyText';
import SmallText from '@/app/components/atoms/SmallText';
import { useIsFocused } from '@react-navigation/native';

type Props = {
    coordSearchOrGeoloc?: { latitude: number, longitude: number } | null;
    agents: User[];
    agentZones: Zone[];
    onSeeProfile: (email: string) => void;
    onMessage: (email: string) => void;
}
export default function UserMap(props: Props) {

    const mapRef = useRef<MapView>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedZone, setSelectedZone] = useState<{ zone: Zone, agents: User[] }>();
    const [zones, setZones] = useState<{ zone: Zone, agents: User[] }[]>([]);
    const isFocused = useIsFocused();

    const initialRegion = {
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    // to avoid blinking markers on map and let them load
    // TODO : find a better way to load markers
    const [avoidBlink, setAvoidBlink] = useState(true);
    useEffect(() => {
        setTimeout(() => { setAvoidBlink(false) }, 5000);
    }, []);


    // animate the map to the selected coordinates
    function animateToSelected(coord: { latitude: number, longitude: number }) {
        mapRef.current?.animateToRegion({
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }, 2000);
    }

    // verify if the selected coordinates are in a zone
    // if yes, we select the zone
    function isInZone(coord: { latitude: number, longitude: number }) {
        const zone = zones.find((zone) => {
            return functions.coordsIsInZone(coord, zone.zone.contour);
        });
        if (zone) {
            setSelectedZone(zone);
        }
    }


    // on geolocation or search address, we center the map on the selected location
    useEffect(() => {
        if (props.coordSearchOrGeoloc) {
            animateToSelected(props.coordSearchOrGeoloc);
            // if is in a zone, we select the zone
            isInZone(props.coordSearchOrGeoloc);
        }
    }, [props.coordSearchOrGeoloc]);


    // we set zones with agents in each zone
    useEffect(() => {
        const zonesWithAgents = props.agentZones.map((zone) => {
            const _agents = props.agents.filter((agent) => agent.agentProperties?.zoneCodes?.includes(zone.code));
            return { zone, agents: _agents };
        });
        setZones(zonesWithAgents);
    }, [props.agentZones, props.agents]);

    useEffect(() => {
        setOpenDrawer(!openDrawer);
    }, [isFocused])

    return (
        <>
            <MapView style={styles.map}
                ref={mapRef}
                initialRegion={initialRegion}
                zoomEnabled={true}
                zoomControlEnabled={false}
                zoomTapEnabled={true}
            >

                {
                    selectedZone &&
                    <Polygon
                        coordinates={functions.setContour(selectedZone.zone.contour)}
                        strokeColor={Colors.white}
                        fillColor={"rgba(96, 122, 243, 0.2)"}
                        strokeWidth={2}
                    />

                }
                {
                    zones.map((zone, index) => {
                        if (zone.zone.centre == null) return;
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: zone.zone.centre[1],
                                    longitude: zone.zone.centre[0]
                                }}
                                title=""
                                description=""
                                tracksViewChanges={avoidBlink || true}
                                onPress={() => {
                                    setSelectedZone(zone);
                                    setOpenDrawer(!openDrawer);
                                }}
                            >
                                <View>
                                    <Image
                                        source={zone.zone.code == selectedZone?.zone.code ? functions.getIconSource('pin1') : functions.getIconSource('pin0')}
                                        style={{ width: 40, height: 40 }}
                                        resizeMode="contain"
                                    />
                                    <SmallText
                                        text={zone.agents.length.toString()}
                                        color={zone.zone.code == selectedZone?.zone.code ? Colors.mainBlue : Colors.white}
                                        style={{
                                            position: 'absolute',
                                            width: 40,
                                            height: 40,
                                            top: 6,
                                            textAlign: 'center'
                                        }}
                                        isBold={zone.zone.code == selectedZone?.zone.code}
                                    />
                                </View>
                            </Marker>
                        )
                    })
                }

            </MapView>
            {
                openDrawer && selectedZone &&
                <AgentsDrawer
                    zone={selectedZone}
                    open={openDrawer}
                    onSeeProfile={(email) => props.onSeeProfile(email)}
                    onMessage={(email) => props.onMessage(email)}

                />
            }
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    markerImage: {
        width: 40,
        height: 40,
        //tintColor: Colors.mainBlue
    }
})