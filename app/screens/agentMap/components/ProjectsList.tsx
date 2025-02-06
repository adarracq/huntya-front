import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Project from '@/app/models/Project';
import ProjectDetails from '@/app/constants/ProjectDetails';
import Title1 from '@/app/components/atoms/Title1';
import FilterMenu from '@/app/components/molecules/FilterMenu';
import SmallText from '@/app/components/atoms/SmallText';
import ProjectDisplay from '@/app/components/molecules/ProjectDisplay';
import Colors from '@/app/constants/Colors';
import Title0 from '@/app/components/atoms/Title0';

type Props = {
    projects: Project[];
    filters: any[];
    onChangeFilters: (filters: any[]) => void;
    onSeeProject: (project: Project) => void;
}

export default function ProjectsList(props: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Title0 title="Liste des projets" isLeft style={{ paddingLeft: 20 }} />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ columnGap: 8 }}
                >
                    <FilterMenu
                        text={('Tous')}
                        selected={props.filters.every(t => t.selected)}
                        onPress={() => {
                            let newTypes = props.filters.map((t) => {
                                return { ...t, selected: !props.filters.every(t => t.selected) }
                            });
                            props.onChangeFilters(newTypes);
                        }}
                    />
                    {
                        props.filters.map((filter, index) => {
                            return (

                                <FilterMenu
                                    key={index}
                                    text={filter.label}
                                    selected={filter.selected && !props.filters.every(t => t.selected)}
                                    onPress={() => {
                                        // if 'all' is selected, we select just the one clicked
                                        if (props.filters.every(t => t.selected)) {
                                            let newFilters = props.filters.map((t) => {
                                                return { ...t, selected: false }
                                            });
                                            newFilters[index].selected = true;
                                            props.onChangeFilters(newFilters);
                                        }
                                        // else if the one clicked is selected, we unselect it
                                        else {
                                            let newFilters = props.filters.map((t) => {
                                                if (t === filter) {
                                                    return { ...t, selected: !t.selected }
                                                }
                                                return t;
                                            });
                                            props.onChangeFilters(newFilters);
                                        }
                                    }}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
            {
                props.projects.length === 0 ?
                    <SmallText text="Aucun résultat" style={{ padding: 20 }} />
                    :
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {
                            props.projects.map((project, index) => {
                                if (props.filters[project.type].selected) {
                                    return (
                                        <ProjectDisplay
                                            key={index}
                                            project={project}
                                            onPress={() => props.onSeeProject(project)}
                                            withUserName
                                        />
                                    )
                                }
                            })
                        }
                    </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollView: {
        rowGap: 24,
        padding: 20,
    },
    head: {
        paddingTop: 48,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
        gap: 24,
    },
})