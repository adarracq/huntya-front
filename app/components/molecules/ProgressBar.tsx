import { View, Text } from 'react-native'
import React from 'react'
import Title2 from '../atoms/Title2'
import * as Progress from 'react-native-progress';
import Colors from '@/app/constants/Colors';

type ProgressBarProps = {
    progress: number;
    total: number;
    title: string;
    width: number;
}
export default function ProgressBar(props: ProgressBarProps) {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8
        }}>
            <Title2 title={props.title} />
            <Progress.Bar
                progress={props.progress / props.total}
                width={props.width}
                color={Colors.mainBlue}
                unfilledColor={'#E7EBFD'}
                borderWidth={0}
            />
        </View>
    )
}