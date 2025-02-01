import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import BodyText from '../atoms/BodyText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { functions } from '@/app/utils/Functions';

type Props = {
  title: string;
  icon?: string;
  onPress: () => void;
  selected: boolean;
}

export default function SimpleCheckbox(props: Props) {
  return (
    <TouchableOpacity onPress={props.onPress}
      style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {
          props.icon &&
          <Image source={functions.getIconSource(props.icon)} style={{ width: 20, height: 20 }} />
        }
        <BodyText text={props.title} isMedium />
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
  },

})