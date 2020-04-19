import React, { useLayoutEffect, useState, useEffect } from 'react'
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Image
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

const DialogBox = ({ guion, onPress, isLast }) => {
  const [animatedBox, setAnimatedBox] = useState(new Animated.Value(0))
  const [animatedText, setAnimatedText] = useState(new Animated.Value(0))
  useLayoutEffect(() => {
    Animated.timing(animatedBox, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(animatedText, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start()
    })
  })

  return (
    <>
      <Animated.View
        style={[
          styles.personImageContainer,
          {
            opacity: animatedText
          }
        ]}
      >
        <Image
          style={styles.personImage}
          resizeMode={'stretch'}
          source={guion.image}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.box,
          {
            opacity: animatedBox
          }
        ]}
      >
        <Animated.Text
          style={[
            styles.boxPersonName,
            {
              opacity: animatedText
            }
          ]}
        >
          {guion.person}
        </Animated.Text>
        <TouchableOpacity
          style={styles.boxTextContainer}
          onPress={() => onPress()}
        >
          <Animated.Text
            style={[
              styles.boxText,
              {
                opacity: animatedText
              }
            ]}
          >
            {guion.text}
          </Animated.Text>
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.arrow,
            {opacity: animatedText}
          ]}
        >
          <TouchableOpacity
            onPress={() => onPress()}
          >
            {
              !isLast ?
              (
                <Ionicons
                  size={20}
                  name={'md-arrow-forward'}
                />
              )
              :
              (
                <Text
                  style={styles.arrowText}
                >
                  Finalizar
                </Text>
              )
            }
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </>
  )
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  box: {
    width: width / 1.108,
    height: height / 3,
    backgroundColor: '#fffa',
    borderWidth: 1,
    borderColor: '#24333c',
    borderRadius: 10,
    top: height / 1.75,
    paddingHorizontal: 10,
    paddingVertical: 1
  },
  personImageContainer: {
    borderWidth: 1,
    top: height / 4.9,
    position: 'absolute',
    left: width / 1.38,
    width: 150
  },
  personImage: {
    width: 150,
    height: 150
  },
  boxPersonName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  boxTextContainer: {
    flex: 1,
    marginBottom: 5,
    paddingVertical: 5
  },
  boxText: {
    fontSize: 17
  },
  arrow: {
    alignItems: 'flex-end',
    bottom: 6
  },
  arrowText: {
    fontSize: 16
  }
})

export default DialogBox