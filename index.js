/**
 * @format
 */
import 'text-encoding-polyfill'
import './src/services/i18n';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
