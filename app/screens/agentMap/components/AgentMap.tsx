import { Image, StyleSheet } from 'react-native'
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
import ProjectDrawer from './ProjectDrawer';

type Props = {
    coordSearchOrGeoloc?: { latitude: number, longitude: number } | null;
    projects: Project[];
    agentZones: Zone[];
    onSeeProfile: (email: string) => void;
    onSeeProject: (project: Project) => void;
    onMessage: (email: string) => void;
}
export default function AgentMap(props: Props) {

    const mapRef = useRef<MapView>(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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


    // on geolocation or search address, we center the map on the selected location
    useEffect(() => {
        if (props.coordSearchOrGeoloc) {
            animateToSelected(props.coordSearchOrGeoloc);
        }
    }, [props.coordSearchOrGeoloc]);




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
                    props.agentZones.map((zone, index) => {
                        if (zone == null) return;
                        return (
                            <Polygon
                                key={index}
                                coordinates={functions.setContour(zone.contour)}
                                strokeColor={Colors.white}
                                fillColor={"rgba(96, 122, 243, 0.2)"}
                                strokeWidth={2}
                            />
                        )
                    })
                }
                {
                    props.projects.map((project, index) => {
                        if (project.coords == null) return;
                        return (
                            <Marker
                                key={index}
                                coordinate={{
                                    latitude: project.coords.latitude,
                                    longitude: project.coords.longitude,
                                }}
                                title=""
                                description=""
                                tracksViewChanges={avoidBlink || true}
                                onPress={() => {
                                    setSelectedProject(project);
                                    setOpenDrawer(!openDrawer);
                                }}
                            >
                                <Image
                                    source={functions.getIconSource('marker-project')}
                                    style={{ width: 40, height: 40 }}
                                    resizeMode="contain"
                                />
                            </Marker>
                        )
                    })
                }

            </MapView>
            {
                openDrawer &&
                <ProjectDrawer
                    project={selectedProject as Project}
                    open={openDrawer}
                    onSeeProfile={() => {
                        props.onSeeProfile(selectedProject?.user_email ?? '');
                    }}
                    onSeeProject={() => {
                        props.onSeeProject(selectedProject as Project);
                    }}
                    onMessage={() => {
                        props.onMessage(selectedProject?.user_email ?? '');
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