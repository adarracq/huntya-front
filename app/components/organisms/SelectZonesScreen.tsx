import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Zone from '@/app/models/Zone';
import FloatingBottomArea from '../molecules/FloatingBottomArea';
import DeletableField from '../molecules/DeletableField';
import SearchAddress from './SearchAddress';
import LoadingScreen from '../molecules/LoadingScreen';
import Coordinates from '@/app/models/Coordinates';
import * as Location from 'expo-location';
import Address from '@/app/models/Address';
import SelectZoneMap from '@/app/screens/zoneSelection/components/SelectZoneMap';
import GeolocationBtn from './GeolocationBtn';
import ValidateZoneDrawer from '@/app/screens/zoneSelection/components/ValidateZoneDrawer';
import { zoneService } from '@/app/services/zone.service';
import DistrictsParis from '@/app/constants/districs/DistrictsParis';

type Props = {
    nbZones: number;
    selectedZones: Zone[];
    onValidate: (selectedZonesIds: string[]) => void;
}
export default function SelectZonesScreen(props: Props) {
    // first we create an array of zones with the length of the number of zones
    // then we fill it with the selected zones and null for the others
    const [agentZones, setAgentZones] = useState<(Zone | null)[]>(Array.from({ length: props.nbZones }, (_, index) => props.selectedZones[index] || null));
    const [loading, setLoading] = useState(false);
    const [coordSearchOrGeolocation, setCoordSearchOrGeolocation] = useState<Coordinates | null>(null);
    const [showValidateDrawer, setShowValidateDrawer] = useState(false);

    const getEmptyIndex = () => {
        return agentZones.findIndex(zone => zone === null);
    }

    const getNbSelectedZone = () => {
        return agentZones.filter(zone => zone !== null).length
    }

    function onAddressSelected(coords: Coordinates, data: any) {
        setCoordSearchOrGeolocation(coords);
    }

    function onGeolocation(coords: Coordinates) {
        setCoordSearchOrGeolocation(coords);
        setLoading(false);
    }

    function checkIfAllZonesSelected(zones: (Zone | null)[]) {
        if (zones.every(zone => zone != null)) {
            setShowValidateDrawer(!showValidateDrawer);
            console.log('all zones selected');
            return true;
        }
        console.log('not all zones selected');
        return false;
    }

    function addToBddNewZones(zones: Zone[]) {
        // first we create an array of zone with the property isNew set to true
        const newZones = zones.map(zone => ({ ...zone, isNew: true }));
        console.log(newZones);
        // then we add them to the bdd
        if (newZones.length > 0) {
            zoneService.createMany(newZones)
                .then(() => {
                    console.log('new zones added to bdd');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function add() {
        /*zoneService.createMany(DistrictsParis.districs)
            .then(() => {
                console.log('new zones added to bdd');
            })
            .catch((error) => {
                console.log(error);
            });*/

        DistrictsParis.districs.forEach(zone => {
            zoneService.create(zone)
                .then(() => {
                    console.log('new zone added to bdd');
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }
    useEffect(() => {
        console.log('add');
        //add();
    }, []);

    return (
        <View style={styles.container}>
            <SearchAddress
                onSelectAddress={onAddressSelected}
            //isSearching={() => { }}
            />
            <SelectZoneMap
                coordSearchOrGeoloc={coordSearchOrGeolocation}
                agentZones={agentZones as Zone[]}
                onAddZone={(zone) => {
                    const newZones = [...agentZones];
                    const index = getEmptyIndex();
                    newZones[index] = zone;
                    setAgentZones(newZones);
                    setCoordSearchOrGeolocation(null);
                    checkIfAllZonesSelected(newZones);
                }}
                onDeleteZone={(zone) => {
                    const newZones = [...agentZones];
                    const index = newZones.findIndex(z => z === zone);
                    newZones[index] = null;
                    setAgentZones(newZones);
                    setCoordSearchOrGeolocation(null);
                }}
            />
            <GeolocationBtn
                onPress={() => setLoading(true)}
                onResult={onGeolocation}
                style={styles.geolocBtn}
            />
            <FloatingBottomArea
                title={`${getNbSelectedZone()}/${props.nbZones} zones sélectionnées`}
                icon="map"
            >
                <View style={styles.zonesContainer}>
                    {
                        agentZones.map((zone, index) => {
                            return (
                                <DeletableField
                                    key={index}
                                    text={zone ? zone.nom : "Zone non sélectionnée"}
                                    isSet={zone !== null}
                                    onDelete={() => {
                                        const newZones = [...agentZones];
                                        newZones[index] = null;
                                        setAgentZones(newZones);
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </FloatingBottomArea>
            {
                loading && <LoadingScreen />
            }
            {
                showValidateDrawer &&
                <ValidateZoneDrawer
                    zones={agentZones as Zone[]}
                    open={showValidateDrawer}
                    onDeleteZone={(index) => {
                        const newZones = [...agentZones];
                        newZones[index] = null;
                        setAgentZones(newZones);
                    }}
                    onValidate={() => {
                        addToBddNewZones(agentZones.filter(zone => zone !== null) as Zone[]);
                        const selectedZonesIds = agentZones.map(zone => zone!.code);
                        props.onValidate(selectedZonesIds);
                    }}
                />
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    zonesContainer: {
        gap: 16,
        padding: 16,
    },
    geolocBtn: {
        position: 'absolute',
        right: 20,
        bottom: 130,
    }
})