import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BodyText from '../atoms/BodyText';
import { functions } from '@/app/utils/Functions';

type CheckBoxProps = {
  title: string;
  onPress: () => void;
  selected: boolean;
  icon: string;
}

export default function CheckBox(props: CheckBoxProps) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={[styles.container, {
        borderColor: props.selected ? Colors.mainBlueLight : Colors.lightGrey,
        borderWidth: props.selected ? 2 : 1,
        backgroundColor: props.selected ? Colors.lightBlue : Colors.white
      }]}>

      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image source={functions.getIconSource(props.icon)} style={{ width: 20, height: 20 }} />
        <View style={{ alignItems: 'flex-start' }}>
          <BodyText text={props.title} isMedium />
        </View>
      </View>

      {
        props.selected ?
          <MaterialCommunityIcons name="checkbox-marked" size={20} color={Colors.mainBlueLight} />
          :
          <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color={Colors.lightGrey} />

      }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  containerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,
    borderRadius: 16,
    backgroundColor: Colors.white,

    borderWidth: 2,
    borderColor: Colors.mainBlueLight,

  }

})