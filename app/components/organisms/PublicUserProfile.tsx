import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import User from '@/app/models/User'
import { functions } from '@/app/utils/Functions';
import Colors from '@/app/constants/Colors';
import Button from '../atoms/Button';
import BodyText from '../atoms/BodyText';
import Languages from '@/app/constants/Languages';
import Title0 from '../atoms/Title0';
import Title2 from '../atoms/Title2';
import { projectService } from '@/app/services/project.service';
import Project from '@/app/models/Project';
import ProjectDisplay from '../molecules/ProjectDisplay';

type Props = {
    user: User;
    onSendMessage: () => void;
    onBack: () => void;
    onProjectPress: (project: Project) => void;
}
export default function PublicUserProfile(props: Props) {

    const [projects, setProjects] = useState<Project[]>([]);

    function getFirstNameAndAge() {
        let res = '';
        if (props.user.firstname) {
            res += props.user.firstname;
        }
        if (props.user.birthdate) {
            res += `, ${functions.getAgeFromBirthdate(props.user.birthdate)}`;
        }
        return res;
    }
    const getProjects = () => {
        if (!props.user._id) return;
        projectService.getAllByUserId(props.user._id)
            .then((response) => {
                setProjects(response);
            }).catch((error) => {
                console.log('error');
            });
    }

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onBack} style={{ position: 'absolute', top: 30, left: 20, zIndex: 2 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={styles.header}>
                <Image source={{ uri: props.user.imageUrl || '' }} style={styles.profilePicture} />
                {props.user.languages &&
                    <View style={styles.languagesContainer}>
                        <BodyText text='LANGUES' />
                        {props.user.languages.map((language, index) => (
                            <Image
                                key={index}
                                source={functions.getIconSource(Languages.languages.find(l => l.id === language)?.icon || '')}
                                style={{ width: 20, height: 20 }} />
                        ))}
                    </View>
                }
            </View>
            <Title0 title={getFirstNameAndAge()} isLeft />
            <ScrollView contentContainerStyle={{ gap: 24, paddingBottom: 100 }}>
                {
                    props.user.presentation && props.user.presentation.length > 0 &&
                    <View style={styles.presContainer}>
                        <Image source={functions.getIconSource('quotes')} style={{ width: 40, height: 40, }} />
                        <BodyText text={props.user.presentation} isItalic />
                    </View>
                }
                <View style={{ gap: 12 }} >
                    <Title2 title={'Projets de ' + props.user.firstname} isLeft />
                    {
                        projects.map((project, index) => (
                            <ProjectDisplay
                                key={index}
                                project={project}
                                onPress={() => props.onProjectPress(project)}
                            />
                        ))
                    }
                </View>
            </ScrollView>

            <Button
                backgroundColor={Colors.mainBlue}
                textColor={Colors.white}
                title="Envoyer un message"
                onPress={props.onSendMessage}
                style={styles.nextBtn}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 20,
        paddingTop: 70,
        gap: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 100,
        backgroundColor: Colors.lightGrey,
    },
    languagesContainer: {
        flexDirection: 'row',
        gap: 10,
        borderRadius: 100,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        paddingHorizontal: 12,
        height: 40,
        alignItems: 'center',
    },
    presContainer: {
        backgroundColor: Colors.lightBlue,
        padding: 20,
        gap: 8,
        borderRadius: 12,
    },
    nextBtn: {
        position: 'absolute',
        bottom: 35,
        left: 20,
    }
})