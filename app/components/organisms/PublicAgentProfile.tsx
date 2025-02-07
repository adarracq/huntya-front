import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Linking } from 'react-native'
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
import IconTitleValueContainer from '../molecules/IconTitleValueContainer';
import AgentSpecialities from '@/app/constants/AgentSpecialities';
import SmallText from '../atoms/SmallText';
import { showMessage } from 'react-native-flash-message';

type Props = {
    user: User;
    onSendMessage: () => void;
    onBack: () => void;
}
export default function PublicAgentProfile(props: Props) {


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

    function onClickLink() {
        {
            if (!props.user.agentProperties?.url || props.user.agentProperties?.url === '') {
                showMessage({
                    message: "Erreur",
                    description: props.user.firstname + " n'a pas renseigné de site web",
                    type: "warning",
                });
            }
            else
                Linking.openURL(props.user.agentProperties?.url || 'https://www.google.com')
                    .then(() => console.log('success'))
                    .catch(() => {
                        showMessage({
                            message: "Erreur",
                            description: "Le site web renseigné par " + props.user.firstname + " n'est pas valide",
                            type: "warning",
                        });
                    });

        }
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onBack} style={{ position: 'absolute', top: 30, left: 20, zIndex: 2 }}>
                <Image source={functions.getIconSource('arrow-left')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View style={styles.header}>
                <View>
                    <Image source={{ uri: props.user.imageUrl || '' }} style={styles.profilePicture} />
                    <View style={styles.noteContainer}>
                        <Image source={functions.getIconSource('star')} style={{ width: 20, height: 20, tintColor: Colors.mainBlue }} />
                        <Title2 title={'4.5/5'} isLeft color={Colors.mainBlue} />
                    </View>
                    <Title0 title={getFirstNameAndAge()} isLeft />
                </View>
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                {props.user.agentProperties?.specialities?.map((speciality, index) => (
                    <View key={index} style={{
                        borderRadius: 100,
                        backgroundColor: AgentSpecialities.specialities[speciality].color,
                        alignContent: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 12,
                    }}>
                        <SmallText text={AgentSpecialities.specialities[speciality].label.toLocaleUpperCase()} color={Colors.white} isBold />
                    </View>
                ))}
            </ScrollView>
            <ScrollView contentContainerStyle={{ gap: 24, paddingBottom: 100, paddingHorizontal: 20 }}>
                {
                    props.user.presentation && props.user.presentation.length > 0 &&
                    <View style={styles.presContainer}>
                        <Image source={functions.getIconSource('quotes')} style={{ width: 40, height: 40, }} />
                        <BodyText text={props.user.presentation} isItalic />
                    </View>
                }
                {props.user.agentProperties &&
                    <View style={{ gap: 12 }} >
                        <View style={{ flexDirection: 'row', gap: 12, }}>
                            <IconTitleValueContainer icon='profile' title='Statut'
                                value={props.user.agentProperties.workStatus === 0 ? 'Indépendant' : 'Salarié'} />
                            <IconTitleValueContainer icon='briefcase' title='Expérience'
                                value={props.user.agentProperties.experience + ' années'} />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 12, }}>
                            <IconTitleValueContainer icon='network' title='Réseau'
                                value={props.user.agentProperties.network || ''} />
                            <IconTitleValueContainer icon='link' title='Site web'
                                value={'Visiter le site'}
                                onClickLink={onClickLink} />

                        </View>
                    </View>
                }
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
        paddingTop: 70,
        gap: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
        borderRadius: 100,
        paddingHorizontal: 8,
        paddingVertical: 4,
        alignSelf: 'center',
        marginTop: -20,
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
        width: Dimensions.get('window').width - 40,
    }
})