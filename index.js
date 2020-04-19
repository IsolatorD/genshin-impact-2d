import { Navigation } from 'react-native-navigation'
import App from './App'
import router from './src/router'
import Orientation from 'react-native-orientation-locker'

Orientation.lockToLandscape()
Navigation.setDefaultOptions({
  layout: {
    orientation: ['landscape']
  }
})

Navigation.registerComponent('index', () => App)
router()
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'index',
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
})


// OLD
// import {AppRegistry} from 'react-native';
// import {name as appName} from './app.json';
// AppRegistry.registerComponent(appName, () => App);