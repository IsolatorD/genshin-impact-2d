import React, { Component } from 'react'
import {
  View,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
} from 'react-native'

import BackButton from '../components/BackButton'
import SceneView from '../components/Scene/SceneView'

class GameChapter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      haveScene: false,
      start: false,
      titleAnimation: new Animated.Value(1)
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        loading: false,
        haveScene: true
      })
      Animated.timing(this.state.titleAnimation, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true
      }).start()
    }, 1500)
  }

  endScene = () => {
    this.setState({
      haveScene: false,
      start: true
    })
  }

  chapterTitle = () => (
    <Animated.View
      style={[
        styles.chapterTitle,
        {
          opacity: this.state.titleAnimation
        }
      ]}
    >
      <Text
        style={styles.textTitle}
      >
        Capitulo {this.props.chapter}
      </Text>
    </Animated.View>
  )

  render () {
    let { loading, haveScene, start } = this.state
    return (
      <>
        {
          loading ?
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
            <View
              style={styles.cotainer}
            >
              <BackButton backTo={'game.map'}/>
              {this.chapterTitle()}
              { haveScene && <SceneView endScene={this.endScene} /> }
              { start &&
                <View>
                  <Text>Aqui el Juego</Text>
                </View>
              }
            </View>
          )
        }
      </>
    )
  }
}

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  gameContainer: {
    width,
    height
  },
  chapterTitle: {
    width,
    position: 'absolute',
    top: height / 2.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'black'
  },
  textTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default GameChapter