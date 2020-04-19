import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  StatusBar
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'
import Video from 'react-native-video'

import SettingsModal from './src/components/SettingsModal'

const App = (props) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0))
  const [fadeInOut, setFadeInOut] = useState(new Animated.Value(0))
  const [isLoaded, setIsLoaded] = useState(true)
  const [visible, setVisible] = useState(false)
  const [sound, setSound] = useState(true)
  const [volume, setVolume] = useState(0.8)

  useLayoutEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start()

    setTimeout(() => {
      Animated.timing(fadeInOut, {
        toValue: 0.8,
        duration: 2000,
        useNativeDriver: true
      }).start()
    }, 2000);
  })

  const startGame = () => {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'game.map',
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

  const changeModal = () => {
    setVisible(!visible)
  }

  const videoError = (err) => {
    console.log('OnError: ', err)
  } 

  return (
    <SafeAreaView>
      {/* <StatusBar hidden={true}/> */}
      <ImageBackground
        source={require('./src/assets/images/main.jpg')}
        style={styles.imageBackground}
      >
      {/* <Video
        source={require('./src/assets/video/background.mp4')}
        style={[
          styles.videoBackground
        ]}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        paused={false}
        onError={videoError}
      /> */}
      <Video
        source={require('./src/assets/audio/ocean.mp3')}
        repeat={true}
        audioOnly={true}
        rate={1.0}
        muted={!sound}
        volume={volume}
      />
      <View
        style={styles.container}
      >
        <Animated.Image
          source={require('./src/assets/images/logo-full.png')}
          style={[
            styles.logo,
            { opacity: fadeAnim }
          ]}
          resizeMode="contain"
        />
        {
          isLoaded && 
          <Animated.View
            style={[
              styles.playButton,
              { opacity: fadeInOut }
            ]}
          >
            <TouchableOpacity
              onPress={() => startGame()}
            >
              <Text
                style={styles.textPlay}
              >
                Empezar
              </Text>
            </TouchableOpacity>
          </Animated.View>
        }
        <TouchableOpacity
          style={styles.settings}
          onPress={() => changeModal()}
        >
          <Ionicons
            name={'ios-settings'}
            color="white"
            size={50}
          />
        </TouchableOpacity>
      </View>
      {
        visible &&
        <SettingsModal
          visible={visible}
          onPress={changeModal}
          options={[
            { name: 'Sonido', type: 1, value: sound, action: setSound
            },
            {
              name: 'Volumen', type: 2, value: volume, action: setVolume
            }
          ]}
        />
      }
      </ImageBackground>
    </SafeAreaView>
  )
}


const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    width,
    height
  },
  videoBackground: {
    // width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0
  },
  logo: {
    width: width / 2,
    height: height/ 1.5,
    top: - 15
  },
  playButton: {
    width,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'black'
  },
  textPlay: {
    color: '#fff',
    fontWeight: 'bold'
  },
  imageBackground: {
    width,
    height
  },
  settings: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: (height / 100) * 10,
    right: (width / 100) * 10
  }
})

export default App
