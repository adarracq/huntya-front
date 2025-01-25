import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Zone from '@/app/models/Zone';
import FloatingBottomArea from '../molecules/FloatingBottomArea';
import DeletableField from '../molecules/DeletableField';
import SearchAddress from './SearchAddress';

type Props = {
    nbZones: number;
    selectedZones: Zone[];
    onValidate: (selectedZonesIds: number[]) => void;
}
export default function SelectZonesScreen(props: Props) {
    // first we create an array of zones with the length of the number of zones
    // then we fill it with the selected zones and null for the others
    const [zones, setZones] = useState<(Zone | null)[]>(Array.from({ length: props.nbZones }, (_, index) => props.selectedZones[index] || null));

    const [loading, setLoading] = useState(false);

    const getEmptyIndex = () => {
        return zones.findIndex(zone => zone === null);
    }

    return (
        <View style={styles.container}>
            <SearchAddress
                onSelectAddress={(coords) => { }}
                isSearching={() => { }}
            />
            <FloatingBottomArea
                title={`${getEmptyIndex()}/${props.nbZones} zones sélectionnées`}
                icon="map"
            >
                <View style={styles.zonesContainer}>
                    {
                        zones.map((zone, index) => {
                            return (
                                <DeletableField
                                    key={index}
                                    text={zone ? zone.nom : "Zone non sélectionnée"}
                                    isSet={zone !== null}
                                    onDelete={() => {
                                        const newZones = [...zones];
                                        newZones[index] = null;
                                        setZones(newZones);
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </FloatingBottomArea>

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
    }
})