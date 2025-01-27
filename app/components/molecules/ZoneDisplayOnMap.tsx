import { View, Text, Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import Zone from '@/app/models/Zone';
import { Marker, Polygon } from 'react-native-maps';
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';

type Props = {
    zone: Zone;
    fillColor: string;
    strokeWidth: number;
    strokeColor: string;
    markerIcon: string;
    avoidBlink?: boolean;
    onPressMarker: (zone: Zone) => void;
}

export default function ZoneDisplayOnMap(props: Props) {
    return (
        <Fragment>
            <Polygon
                coordinates={functions.setContour(props.zone.contour)}
                strokeColor={props.strokeColor}
                fillColor={props.fillColor}
                strokeWidth={props.strokeWidth}
            />
            <Marker
                coordinate={{ latitude: props.zone.centre[1], longitude: props.zone.centre[0] }}
                title=""
                description=""
                tracksViewChanges={props.avoidBlink || true}
                onPress={() => {
                    props.onPressMarker(props.zone);
                }}
            >
                <Image
                    source={functions.getIconSource(props.markerIcon)}
                    style={styles.markerImage}
                    resizeMode="contain"
                />
            </Marker>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    markerImage: {
        width: 40,
        height: 40,
    }
})