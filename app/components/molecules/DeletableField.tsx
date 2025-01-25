import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Title2 from '../atoms/Title2'
import { functions } from '@/app/utils/Functions'
import BodyText from '../atoms/BodyText'

type Props = {
  text: string
  isSet: boolean
  onDelete: () => void
}
export default function DeletableField(props: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: props.isSet ? Colors.mainBlue : Colors.lightGrey,
        backgroundColor: Colors.white,
        width: '100%',
        height: 50,
      }}
    >
      {
        props.isSet ?
          <Title2 title={props.text} />
          :
          <BodyText text={props.text} color={Colors.darkGrey} />
      }
      {
        props.isSet ?
          <TouchableOpacity onPress={props.onDelete}>
            <Image
              source={functions.getIconSource('trash')}
              style={{
                width: 24,
                height: 24,
                tintColor: Colors.mainRed
              }} />
          </TouchableOpacity>
          :
          <View style={{ width: 24 }}>
          </View>

      }

    </View>
  )
}