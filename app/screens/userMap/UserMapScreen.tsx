import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { UserMapNavParams } from '@/app/navigations/UserMapNav';
import { UserContext } from '@/app/contexts/UserContext';
import User from '@/app/models/User';
import Coordinates from '@/app/models/Coordinates';
import AgentSpecialities from '@/app/constants/AgentSpecialities';
import { useIsFocused } from '@react-navigation/native';
import { userService } from '@/app/services/user.service';
import { zoneService } from '@/app/services/zone.service';
import Zone from '@/app/models/Zone';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import GeolocationBtn from '@/app/components/organisms/GeolocationBtn';
import DrawerCBR from '@/app/components/molecules/DrawerCBR';
import IconButton from '@/app/components/molecules/IconButton';
import Colors from '@/app/constants/Colors';
import SearchAddress from '@/app/components/organisms/SearchAddress';
import UserMap from './components/UserMap';

type Props = NativeStackScreenProps<UserMapNavParams, 'HomeUserMap'>;
export default function UserMapScreen({ navigation, route }: Props) {

    const [loading, setLoading] = useState(false);
    const [coordSearchOrGeolocation, setCoordSearchOrGeolocation] = useState<Coordinates | null>(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [typeFilters, setTypeFilters] = useState(AgentSpecialities.specialities);
    const [isSearching, setIsSearching] = useState(false);
    const [agents, setAgents] = useState<User[]>([]);
    const [agentsFiltered, setAgentsFiltered] = useState<User[]>([]);
    const [agentsZones, setAgentZones] = useState<Zone[]>([]);
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

    // first get agents
    function getAgents() {
        setLoading(true);
        userService.getAgents()
            .then((agents: User[]) => {
                setAgents(agents);
                // get zonesCodes
                const zoneCodes = agents.map((agent) => agent.agentProperties?.zoneCodes).flat().filter((code): code is string => code !== null && code !== undefined);
                getZones(zoneCodes);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    // then get zones 
    function getZones(zoneCodes: string[]) {
        zoneService.getMany(zoneCodes)
            .then((zones: Zone[]) => {
                setAgentZones(zones);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            })
    }

    // initialize all filters to true
    useEffect(() => {
        typeFilters.map((type) => {
            type.selected = true;
        })
        setTypeFilters(typeFilters);
    }, [])

    // maj agentsFiltered when agents or typeFilters change
    useEffect(() => {
        if (agents.length > 0) {
            const _agentsFiltered = agents.filter((agent) => {
                return typeFilters.find((type) => {
                    if (agent.agentProperties?.specialities)
                        return type.selected && agent.agentProperties?.specialities.includes(type.id)
                })
            })
            setAgentsFiltered(_agentsFiltered);

        }
    }, [typeFilters, agents])


    useEffect(() => {
        getAgents();
    }, [])


    return (
        <View style={styles.container}>


            <UserMap
                agents={agentsFiltered}
                agentZones={agentsZones}
                coordSearchOrGeoloc={coordSearchOrGeolocation}
                onSeeProfile={(email) => navigation.navigate('UserSeeAgentProfile', { email })}
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