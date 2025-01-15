import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'


export default function LoadingScreen() {
    return (
        <View style={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: "rgba(18, 35, 196, 0.2)",
            zIndex: 999
        }}>
            <LottieView
                source={require('@/app/assets/lotties/loading.json')}
                autoPlay
                loop
                style={{
                    width: 200,
                    height: 200
                }}
            />
        </View>
    )
}