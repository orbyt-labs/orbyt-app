import ReactNative from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from 'react-native-i18n';
import { LANGUAGE } from '../constants/storage';
// Polyfill Intl & include fallback locale (en) for Hermes iOS
// import 'intl';
// import 'intl/locale-data/jsonp/en.js';

// Import all locales
import en from './languages/en.json';

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
// Define the supported translations
I18n.translations = {
	en
};
// If language selected get locale
getUserPreferableLocale();

// Uncomment this for using RTL
//const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL = false; // currentLocale.indexOf('jaJp') === 0;

// Set locale
export async function setLocale(locale: any) {
	I18n.locale = locale;
	// Platform.OS === 'ios' && getLocaleData(locale);
	await AsyncStorage.setItem(LANGUAGE, locale);
}

// Get languages
export function getLanguages() {
	return {
		en: 'English',
	};
}

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name: any, params = {}) {
	return I18n.t(name, params);
}

// Allow persist locale after app closed
async function getUserPreferableLocale() {
	const locale = await AsyncStorage.getItem(LANGUAGE);
	if (locale) {
		I18n.locale = locale;
	}
}

export default I18n;