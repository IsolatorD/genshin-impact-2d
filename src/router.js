import { Navigation } from 'react-native-navigation'

import GameScreen from './screens/GameScreen'
import GameChapterScreen from './screens/GameChapter'

export default function () {
  Navigation.registerComponent('game.map', () => GameScreen)
  Navigation.registerComponent('game.chapter', () => GameChapterScreen)
}