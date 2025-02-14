import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Zone from '@/app/models/Zone';
import FloatingBottomArea from '../molecules/FloatingBottomArea';
import DeletableField from '../molecules/DeletableField';
import SearchAddress from './SearchAddress';
import LoadingScreen from '../molecules/LoadingScreen';
import Coordinates from '@/app/models/Coordinates';
import SelectZoneMap from '@/app/screens/zoneSelection/components/SelectZoneMap';
import GeolocationBtn from './GeolocationBtn';
import ValidateZoneDrawer from '@/app/screens/zoneSelection/components/ValidateZoneDrawer';
import { zoneService } from '@/app/services/zone.service';

type Props = {
    nbZones: number;
    selectedZones: Zone[];
    onValidate: (selectedZonesCodes: string[]) => void;
}
export default function SelectZonesScreen(props: Props) {

    const [agentZones, setAgentZones] = useState<(Zone | null)[]>(new Array(props.nbZones).fill(null));
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
            return true;
        }
        return false;
    }

    function addToBddNewZones(zones: Zone[]) {
        // first we create an array of zone with the property isNew set to true
        const newZones = zones.map(zone => ({ ...zone, isNew: true }));
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
    // DO NOT USE THIS FUNCTION
    /*function add() {
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
    */


    // when the selected zones change we update the agentZones array
    useEffect(() => {
        const zones = new Array(props.nbZones).fill(null);
        props.selectedZones.forEach(zone => {
            const index = zones.findIndex(z => z === null);
            zones[index] = zone;
        });
        setAgentZones(zones);
    }, [props.selectedZones]);

    return (
        <View style={styles.container}>
            <SearchAddress
                onSelectAddress={onAddressSelected}
                isSearching={() => { }}
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
                        const selectedZoneCodes = agentZones.map(zone => zone!.code);
                        props.onValidate(selectedZoneCodes);
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