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

class ChapterModal extends Component {
  constructor (props) {
    super(props)
  }

  renderChapter = (chapter, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.chapter,
        {
          top: chapter.y,
          left: chapter.x
        }
      ]}
      onPress={() => this.props.onPressChapter(chapter.name)}
    >
      <Text
        style={styles.chapterText}
      >
        {chapter.name}
      </Text>
      <View style={styles.chapterPoint} />
    </TouchableOpacity>
  )


  render () {
    const {visible, title, onPress, chapters} = this.props
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
                {title}
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
            {
              chapters.map((chapter, i) => this.renderChapter(chapter, i))
            }
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
    width: width - (width / 10),
    height: height - (height / 6),
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
    flex: 1.2,
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
    flex: 1
  },
  chapter: {
    position: 'absolute',
    // borderWidth: 1,
    alignItems: 'center',
    width: 120,
    height: 60,
  },
  chapterText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  chapterPoint: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: '#cca574'
  }
})

export default ChapterModal