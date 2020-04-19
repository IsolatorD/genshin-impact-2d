import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Animated
} from 'react-native'
import Video from 'react-native-video'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Navigation } from 'react-native-navigation'

import ChapterModal from '../components/ChapterModal'
import BackButton from '../components/BackButton'

class GameScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      regionAnimation: new Animated.Value(0),
      regions: [
        {
          title: 'Mondstadt',
          chapters: [
            {name: 'Uno', x: width / 15, y: height / 3},
            {name: 'Dos', x: width / 5, y: height / 9},
            {name: 'tres', x: width / 3.5, y: height / 2},
            {name: 'cuatro', x: width / 2, y: height / 5},
            {name: 'cinco', x: width / 1.7, y: height / 2},
            {name: 'Seis', x: width / 1.4, y: height / 4}
          ]
        },
        {
          title: 'Liyue',
          chapters: [
            {name: 'Siete', x: width / 15, y: height / 3},
            {name: 'Ocho', x: width / 5, y: height / 9},
            {name: 'Nueve', x: width / 3.5, y: height / 2},
            {name: 'Diez', x: width / 2, y: height / 5},
            {name: 'Once', x: width / 1.7, y: height / 2},
            {name: 'Doce', x: width / 1.4, y: height / 4}
          ]
        },
        {
          title: 'Florentia',
          chapters: [
            {name: 'Trece', x: width / 15, y: height / 3},
            {name: 'Catorce', x: width / 5, y: height / 9},
            {name: 'Quince', x: width / 3.5, y: height / 2},
            {name: 'Dieciseis', x: width / 2, y: height / 5},
            {name: 'Diecisite', x: width / 1.7, y: height / 2},
            {name: 'Dieciocho', x: width / 1.4, y: height / 4}
          ]
        }
      ],
      visible: false,
      regionSelected: {
        title: null,
        chapters: []
      }
    }
  }

  componentDidMount () {
    // setTimeout(() => {
    //   this.setState({
    //     loading: false
    //   })
      Animated.timing(this.state.regionAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
    // }, 3000)
  }

  setRegion = (region) => {
    if (!region) {
      region = {
        title: null,
        chapters: []
      }
    }
    this.setState({
      visible: !this.state.visible,
      regionSelected: region
    })
  }

  setChapter = (chapterName) => {
    console.log('Chapter selected: ', chapterName)
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'game.chapter',
                options: {
                  topBar: {
                    visible: false
                  }
                },
                passProps: {
                  chapter: chapterName
                }
              }
            }
          ]
        }
      }
    })
  }

  regionPointer = (region, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.regionContainer,
        styles[`region${region.title}`]
      ]}
      onPress={() => this.setRegion(region)}
    >
      {
        region.title !== 'Liyue' &&
        <Animated.View
        style={[
          styles.regionPoint,
          {
            opacity: this.state.regionAnimation
          }
        ]}
        />
      }
      <Animated.Text
        style={[
          styles.regionText,
          {
            opacity: this.state.regionAnimation
          }
        ]}
      >
        {region.title}
      </Animated.Text>
      {
        region.title === 'Liyue' &&
        <Animated.View
        style={[
          styles.regionPoint,
          {
            opacity: this.state.regionAnimation
          }
        ]}
        />
      }
    </TouchableOpacity>
  )

  render () {
    const { loading, regions, visible, regionSelected } = this.state

    return (
      <>
        { loading ?
          (
            <View
              style={styles.loadingContainer}
            >
              <ActivityIndicator
                color={'#cca574'}
                size="large"
              />
            </View>
          )
          :
          (
            <ImageBackground
              style={styles.container}
              resizeMode={'stretch'}
              source={require('../assets/images/map.png')}
            >
              <Video
                source={require('../assets/audio/fantasy-music.mp3')}
                repeat={true}
                audioOnly={true}
                rate={1.0}
              />
              <BackButton backTo={'index'} />
              {
                regions.map((region, i) => this.regionPointer(region, i))
              }
              {
                visible &&
                <ChapterModal
                  visible={visible}
                  title={regionSelected.title}
                  onPress={this.setRegion}
                  onPressChapter={this.setChapter}
                  chapters={regionSelected.chapters}
                />
              }
            </ImageBackground>
          )
        }
      </>
    )
  }
}

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#cca574'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  regionContainer: {
    position: 'absolute',
    width: 130,
    height: 50,
    alignItems: 'center'
  },
  regionPoint: {
    width: 20,
    height: 20,
    borderRadius: 100,
    borderColor: '#24333c',
    borderWidth: 2,
    backgroundColor: '#3498db'
  },
  regionText: {
    color: '#ecf0f1',
    fontSize: 25,
    fontWeight: 'bold'
  },
  regionMondstadt: {
    left: width / 2.7,
    top: height / 4
  },
  regionLiyue: {
    left: width / 1.6,
    top: height / 2.2
  },
  regionFlorentia: {
    left: width / 12,
    top: height / 2.5
  },
  inDevelopmentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inDevelopment: {
    fontSize: 40,
    fontWeight: 'bold'
  }
})

export default GameScreen