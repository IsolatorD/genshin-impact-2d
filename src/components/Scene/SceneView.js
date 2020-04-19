import React, { Component } from 'react'
import {
  ImageBackground,
  StyleSheet,
  Dimensions
} from 'react-native'

import DialogBox from './DialogBox'

class SceneView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      guion: [
        { person: 'Test', image: require('../../assets/images/logo-simple.png'), text: 'Texto de pruebas'},
        { person: 'Test 2', image: require('../../assets/images/logo-full.png'), text: 'Otro texto'},
        { person: 'Test 3', image: require('../../assets/images/logo-simple.png'), text: 'Otro texto mas'},
        { person: 'Test 4', image: require('../../assets/images/logo-full.png'), text: 'Otro texto mas, pero que es mucho mas largo que los anteriores y eso es para probar que todo el texto encaje en la caja de dialogo. Otro texto mas, pero que es mucho mas largo que los anteriores y eso es para probar que todo el texto encaje en la caja de dialogo.Otro texto mas, pero que es mucho mas largo que los anteriores y eso es para probar que todo el texto encaje en la caja de dialogo.Otro texto mas, pero que es mucho mas largo que los anteriores y eso es para probar que todo el texto encaje en la caja de dialogo.'}
      ],
      guionIndex: 0,
      isLast: false
    }
  }

  nextText = () => {
    if (this.state.guionIndex < this.state.guion.length - 1) {
      this.setState({
        guionIndex: this.state.guionIndex + 1
      }, () => {
        if (this.state.guionIndex === this.state.guion.length - 1) {
          this.setState({
            isLast: true
          })
        }
      })
    } else {
      this.props.endScene()
    }
  }

  render () {
    let { guion, guionIndex, isLast } = this.state
    return (
      <ImageBackground
        style={styles.sceneContainer}
        resizeMode={'cover'}
        source={require('../../assets/images/pergament.png')}
      >
        <DialogBox
          guion={guion[guionIndex]}
          onPress={this.nextText}
          isLast={isLast}
        />
      </ImageBackground>
    )
  }
}

const {width, height} = Dimensions.get('screen')
const styles = StyleSheet.create({
  sceneContainer: {
    width,
    height,
    right: 8,
    paddingHorizontal: 10
  }
})

export default SceneView