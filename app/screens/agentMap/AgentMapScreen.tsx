import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AgentMapNavParams } from '@/app/navigations/AgentMapNav';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import GeolocationBtn from '@/app/components/organisms/GeolocationBtn';
import SearchAddress from '@/app/components/organisms/SearchAddress';
import Coordinates from '@/app/models/Coordinates';
import IconButton from '@/app/components/molecules/IconButton';
import Colors from '@/app/constants/Colors';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import ProjectDetails from '@/app/constants/ProjectDetails';
import DrawerCBR from '@/app/components/molecules/DrawerCBR';
import SwitchListMap from './components/SwitchListMap';
import ProjectsList from './components/ProjectsList';
import { projectService } from '@/app/services/project.service';
import Zone from '@/app/models/Zone';
import Project from '@/app/models/Project';
import User from '@/app/models/User';
import { UserContext } from '@/app/contexts/UserContext';
import { userService } from '@/app/services/user.service';
import { useIsFocused } from '@react-navigation/native';
import { zoneService } from '@/app/services/zone.service';
import AgentMap from './components/AgentMap';

type Props = NativeStackScreenProps<AgentMapNavParams, 'HomeAgentMap'>;
export default function AgentMapScreen({ navigation, route }: Props) {

    const [user, setUser] = useContext(UserContext);
    const [userData, setUserData] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [coordSearchOrGeolocation, setCoordSearchOrGeolocation] = useState<Coordinates | null>(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [typeFilters, setTypeFilters] = useState(ProjectDetails.types);
    const [isList, setIsList] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [projectsInZones, setProjectsInZones] = useState<Project[]>([]);
    const [agentZones, setAgentZones] = useState<Zone[]>([]);
    const isFocused = useIsFocused();

    function onAddressSelected(coords: Coordinates, data: any) {
        setCoordSearchOrGeolocation(coords);
    }

    function onGeolocation(coords: Coordinates) {
        setCoordSearchOrGeolocation(coords);
        setLoading(false);
    }

    function onClickFilterMarker(item: any) {
        const newTypes = typeFilters.map((type) => {
            if (type.id === item.id) {
                return { ...type, selected: !type.selected }
            }
            return type;
        });
        setTypeFilters(newTypes);
    }

    // first get user
    function getUserAndProjectsAndZones() {
        setLoading(true);
        userService.getByEmail(user.email)
            .then((user: User) => {
                setUserData(user);
                if (user.agentProperties?.zoneCodes)
                    getProjectsInZones(user.agentProperties?.zoneCodes);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    // then get project
    function getProjectsInZones(zoneCodes: string[]) {
        projectService.getProjectsInZones(zoneCodes)
            .then(projects => {
                setProjectsInZones(projects);
                getZones(zoneCodes);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
    }

    // finally get zones
    function getZones(zoneCodes: string[]) {
        zoneService.getMany(zoneCodes)
            .then((zones: Zone[]) => {
                setAgentZones(zones);
                console.log(zones.length);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    useEffect(() => {
        getUserAndProjectsAndZones();
    }, [user, isFocused])


    return (
        <View style={styles.container}>
            {!isSearching && <SwitchListMap
                isList={isList}
                onSwitch={() => {
                    setIsList(!isList);
                    setOpenFilter(false);
                }}
            />}
            {
                isList ?
                    <ProjectsList
                        projects={projectsInZones}
                        filters={typeFilters}
                        onChangeFilters={(_filters) => setTypeFilters(_filters)}
                        onSeeProject={(_project) => navigation.navigate('AgentSeeProject', { project: _project })}
                    />
                    :
                    <>
                        <AgentMap
                            projects={projectsInZones}
                            agentZones={agentZones}
                            coordSearchOrGeoloc={coordSearchOrGeolocation}
                            onSeeProfile={(email) => navigation.navigate('AgentSeeUserProfile', { email })}
                            onSeeProject={(project) => navigation.navigate('AgentSeeProject', { project })}
                            onMessage={(email) => console.log('message', email)}
                        />

                        <SearchAddress
                            onSelectAddress={onAddressSelected}
                            isSearching={setIsSearching}
                        />
                        <IconButton
                            onPress={() => setOpenFilter(!openFilter)}
                            backgroundColor={Colors.white}
                            icon={'filter'}
                            iconColor={Colors.mainBlue}
                            style={styles.filterBtn}
                        />
                        <DrawerCBR
                            open={openFilter}
                            value={0}
                            title={'Filtrer par type'}
                            items={typeFilters}
                            onSelectItem={onClickFilterMarker}
                            type={'checkbox'}
                        />
                        <GeolocationBtn
                            onPress={() => setLoading(true)}
                            onResult={onGeolocation}
                            style={styles.geolocBtn}
                        />
                    </>
            }
            {
                loading && <LoadingScreen />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    geolocBtn: {
        position: 'absolute',
        right: 20,
        bottom: 120,
    },
    filterBtn: {
        position: 'absolute',
        right: 20,
        bottom: 180,
    }
})