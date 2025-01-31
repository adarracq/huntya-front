import { StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Zone from '@/app/models/Zone';
import { geoApiGouvService } from '@/app/services/geoApiGouv';
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';
import { zoneService } from '@/app/services/zone.service';
import Coordinates from '@/app/models/Coordinates';
import { showMessage } from 'react-native-flash-message';
import ZoneDrawer from './ZoneDrawer';
import ZoneDisplayOnMap from '@/app/components/molecules/ZoneDisplayOnMap';
import MapView from 'react-native-maps';

type Props = {
    coordSearchOrGeoloc?: { latitude: number, longitude: number } | null;
    //locCoord?: { latitude: number, longitude: number } | undefined;
    onAddZone: (zone: Zone) => void;
    onDeleteZone: (zone: Zone) => void;
    agentZones: Zone[];
}
export default function SelectZoneMap(props: Props) {

    const mapRef = useRef<MapView>(null);
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    const [bddZones, setBddZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);

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

    function handleRegionChange() {
        //props.onChangeCenter();
    }

    function handleRegionChangeComplete(region: { latitude: number, longitude: number }) {
        //getCommunes(region.latitude, region.longitude);
    }




    // animate the map to the selected coordinates
    function animateToSelected(coord: { latitude: number, longitude: number }) {
        mapRef.current?.animateToRegion({
            latitude: coord.latitude,
            longitude: coord.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }, 2000);
    }

    // get the zones from coordinates
    // if the coordinates are in a zone from bdd, we select the zone 
    // if not we ask geoApiGouv for the zone
    function selectZone(coords: Coordinates) {
        let _zone = null;

        // check if the coordinates are in a zone from the agent
        props.agentZones.forEach(zone => {
            if (zone && functions.coordsIsInZone({ latitude: coords.latitude, longitude: coords.longitude }, zone.contour)) {
                _zone = zone;
                // add isSelected to the zone
                _zone.isSelected = true;
                return;
            }
        });
        // check if the coordinates are in a zone from the bdd
        bddZones.forEach(zone => {
            if (functions.coordsIsInZone({ latitude: coords.latitude, longitude: coords.longitude }, zone.contour)) {
                _zone = zone;
                return;
            }
        });
        if (_zone) {
            setSelectedZone(_zone);
        }
        // if the coordinates are not in a zone from the agent or the bdd, we ask geoApiGouv
        else {
            geoApiGouvService.getByCoords(coords.latitude, coords.longitude).then(resp => {
                if (resp.length == 0) {
                    showMessage({
                        message: "Zone non disponible",
                        description: "Désolé, la zone n'est pas disponible pour le moment.",
                        type: "warning",

                    });
                    return;
                }
                let _zone = new Zone(
                    resp[0].code,
                    resp[0].nom,
                    //manage multiple zones like islands
                    resp[0].contour.type == "MultiPolygon" ? resp[0].contour.coordinates[0][0] : resp[0].contour.coordinates[0],
                    resp[0].centre.coordinates,
                    resp[0].population,
                    resp[0].departement.nom,
                    resp[0].region.nom,
                    0, //nbContacts
                    0, //nbProjets
                    true, //isNew
                    false //isSelected
                );
                setSelectedZone(_zone);
                setOpenDrawer(!openDrawer);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    // on geolocation or search address, we center the map on the selected location
    // and we get the zone from the coordinates
    useEffect(() => {
        if (props.coordSearchOrGeoloc) {
            animateToSelected(props.coordSearchOrGeoloc);
            selectZone(props.coordSearchOrGeoloc);
        }
    }, [props.coordSearchOrGeoloc]);

    // if a zone is selected, we send it to the parent component
    /*useEffect(() => {
        if (selectedZone)
            props.onZoneSelected(selectedZone);
    }, [selectedZone, marker]);*/

    // we get the zones from the database
    useEffect(() => {
        setLoading(true);
        zoneService.getAll().then(resp => {
            setLoading(false);
            setBddZones(resp);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }, []);


    return (
        <>
            <MapView style={styles.map}
                ref={mapRef}
                initialRegion={initialRegion}
                zoomEnabled={true}
                zoomControlEnabled={false}
                zoomTapEnabled={true}
            //onRegionChange={handleRegionChange}
            //onRegionChangeComplete={handleRegionChangeComplete}
            //onPress={(event) => {getPermissions(event.nativeEvent.coordinate);}}
            >
                {
                    // if a zone is selected and is not in the agent zones, we display it
                    selectedZone && !selectedZone.isSelected &&
                    <ZoneDisplayOnMap
                        zone={selectedZone}
                        fillColor="rgba(96, 122, 243, 0.2)"
                        strokeWidth={2}
                        strokeColor={Colors.mainBlue}
                        markerIcon="pin1"
                        onPressMarker={(zone) => {
                            setOpenDrawer(!openDrawer);
                        }}
                    />

                }
                {
                    props.agentZones.map((zone, index) => {
                        if (zone == null) return;
                        return (
                            <ZoneDisplayOnMap
                                key={index}
                                zone={zone}
                                fillColor="rgba(61, 231, 129, 0.5)"
                                strokeWidth={2}
                                strokeColor={Colors.white}
                                markerIcon="pin2"
                                onPressMarker={(zone) => {
                                    // add isSelected to the zone
                                    zone.isSelected = true;
                                    setSelectedZone(zone);
                                    setOpenDrawer(!openDrawer);
                                }}
                            />
                        )
                    })
                }
                {
                    bddZones.map((zone, index) => {
                        // if zone.code is not in the agent zones.code and is not the selected zone, we display it
                        if (
                            zone == null ||
                            props.agentZones.find(agentZone => agentZone && agentZone.code == zone.code) ||
                            (selectedZone && selectedZone.code == zone.code)
                        ) return;

                        return (
                            <ZoneDisplayOnMap
                                key={index}
                                zone={zone}
                                fillColor="rgba(100, 100, 100, 0.2)"
                                strokeWidth={1}
                                strokeColor={Colors.darkGrey}
                                markerIcon="pin0"
                                avoidBlink={avoidBlink}
                                onPressMarker={(zone) => {
                                    setSelectedZone(zone);
                                    setOpenDrawer(!openDrawer);
                                }}
                            />
                        )
                    })
                }
            </MapView>
            {
                selectedZone &&
                <ZoneDrawer
                    zone={selectedZone}
                    open={openDrawer}
                    onAddZone={() => {
                        props.onAddZone(selectedZone);
                        setSelectedZone(null);
                    }}
                    onDeleteZone={() => {
                        props.onDeleteZone(selectedZone);
                        setSelectedZone(null);
                        console.log("delete");
                    }}
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