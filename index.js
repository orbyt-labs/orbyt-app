/**
 * @format
 */
 import './shim.js';

import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import crypto from 'crypto';
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
