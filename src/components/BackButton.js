import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'

const BackButton = ({ backTo, onPress }) => {

  const onBack = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: backTo,
                options: {
                  topBar: {
                    visible: false
                  }
                }
              }
            }
          ]
        }
      }
    })
  }

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => onPress ? onPress() : onBack()}
    >
      <Ionicons
        name={'ios-arrow-back'}
        size={25}
        color={'#24333c'}
      />
      <Text
        style={styles.backButtonText}
      >
        Volver
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    width: 85,
    marginTop: 5,
    marginStart: 5,
    paddingStart: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#24333c',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#cca574'
  },
  backButtonText: {
    marginStart: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#24333c'
  }
})

export default BackButton