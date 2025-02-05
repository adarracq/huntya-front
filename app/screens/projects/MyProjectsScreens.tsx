import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProfileNavParams } from '@/app/navigations/ProfileNav';
import Colors from '@/app/constants/Colors';
import Title0 from '@/app/components/atoms/Title0';
import { functions } from '@/app/utils/Functions';
import IconButton from '@/app/components/molecules/IconButton';
import Project from '@/app/models/Project';
import LoadingScreen from '@/app/components/molecules/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';
import { projectService } from '@/app/services/project.service';
import SmallText from '@/app/components/atoms/SmallText';
import ProjectDisplay from '@/app/components/molecules/ProjectDisplay';

type Props = NativeStackScreenProps<ProfileNavParams, 'MyProjects'>;
export default function MyProjectsScreens({ navigation, route }: Props) {

    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const isFocused = useIsFocused();

    const getProjects = () => {
        setLoading(true);
        if (!route.params.user._id) return;
        projectService.getAllByUserId(route.params.user._id)
            .then((response) => {
                setLoading(false);
                setProjects(response);
            }).catch((error) => {
                setLoading(false);
                console.log('error');
            });
    }

    useEffect(() => {
        getProjects();
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 30, left: 20 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={styles.topInfos}>
                <View style={{ flexDirection: 'row' }}>
                    <Title0 title="Mes projets" />
                    <Title0 title={' (' + projects.length + ')'} color={Colors.mainBlue} />
                </View>
                <IconButton
                    icon='plus'
                    backgroundColor={Colors.mainBlue}
                    iconColor={Colors.white}
                    onPress={() => navigation.navigate('NewProject0Type', { user: route.params.user })}
                />
            </View>
            {
                projects.length == 0 &&
                <SmallText text="Vous n'avez pas encore de projet, cliquer sur le bouton + ci-dessus pour en créer un." isLeft />
            }
            <ScrollView contentContainerStyle={{ gap: 20 }}>
                {
                    projects.map((project, index) => (
                        <ProjectDisplay
                            key={index}
                            project={project}
                            onPress={() => navigation.navigate('SeeProject', { project: project })}
                        />
                    ))
                }
            </ScrollView>
            {
                loading && <LoadingScreen />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: Colors.white,
        gap: 20
    },
    topInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    }

})