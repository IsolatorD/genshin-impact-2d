import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Switch
} from 'react-native'
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider'

class SettingsModal extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {visible, onPress, options} = this.props
    return (
      <Modal
        isVisible={visible}
        backdropOpacity={.2}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View
          style={styles.modalContainer}
        >
          <View
            style={styles.header}
          >
            <View
              style={styles.headerTextContainer}
            >
              <Text
                style={styles.headerText}
              >
                Opciones
              </Text>
            </View>
            <View
              style={styles.buttonContainer}
            >
              <TouchableOpacity
                onPress={() => onPress()}
                style={styles.closeButton}
              >
                <Ionicons
                  name={'ios-close'}
                  size={40}
                  color={'#24333c'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={styles.content}
          >
            {options.map((option, i) => {
              return (
                <View
                  key={i}
                  style={styles.option}
                >
                  <Text
                    style={styles.optionText}
                  >
                    {option.name}
                  </Text>
                  <View
                    style={styles.actionContainer}
                  >
                    {option.type === 1 ?
                      <Switch
                        trackColor={{
                          false: '#bbbbbb',
                          true: '#cca574'
                        }}
                        thumbColor={option.value ? '#cca574' : '#bbbbbb'}
                        value={option.value}
                        onValueChange={() => option.action(!option.value)}
                      />
                      :
                      <Slider
                        style={styles.volume}
                        value={option.value}
                        minimumValue={0}
                        maximumValue={1}
                        onValueChange={option.action}
                        minimumTrackTintColor='#cca574'
                        maximumTrackTintColor='#bbbbbb'
                        thumbTintColor="#cca574"
                      />
                    }
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </Modal>
    )
  }
}
const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create({
  modalContainer: {
    borderWidth: 1.5,
    borderColor: '#24333c',
    alignSelf: 'center',
    width: width / 1.9,
    height: height / 1.5,
    backgroundColor: '#fff',
    borderColor: '#24333c',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 5,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 5
  },
  header: {
    flexDirection: 'row'
  },
  headerTextContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  headerText: {
    fontSize: 20,
    color: '#24333c',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 5
  },
  closeButton: {
    width: 40,
    height: 30,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#24333c',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#cca574'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 60,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  option: {
    flexDirection: 'row',
    // borderWidth: 1,
    marginTop: 40
  },
  optionText: {
    color: '#24333c',
    fontWeight: 'bold',
    fontSize: 16
  },
  actionContainer: {
    flex: 1,
    // height: 30,
    // borderWidth: 2,
    justifyContent: 'flex-end'
  },
  volume: {
    alignSelf: 'flex-end',
    width: width / 3.5
  }
})

export default SettingsModal