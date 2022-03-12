import * as Keychain from 'react-native-keychain';
import Encryptor from './encryptor';
import { strings } from '../locales/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import {
	BIOMETRY_CHOICE,
	BIOMETRY_CHOICE_DISABLED,
	PASSCODE_CHOICE,
	PASSCODE_DISABLED,
	TRUE,
} from '../constants/storage';
import Device from '../utils/device';

const privates = new WeakMap();
const encryptor = new Encryptor();
const defaultOptions = {
	service: 'seni.tembe.orbyt',
	authenticationPromptTitle: strings('authentication.auth_prompt_title'),
	authenticationPrompt: { title: strings('authentication.auth_prompt_desc') },
	authenticationPromptDesc: strings('authentication.auth_prompt_desc'),
	fingerprintPromptTitle: strings('authentication.fingerprint_prompt_title'),
	fingerprintPromptDesc: strings('authentication.fingerprint_prompt_desc'),
	fingerprintPromptCancel: strings('authentication.fingerprint_prompt_cancel'),
};

/**
 * Class that wraps Keychain from react-native-keychain
 * abstracting metamask specific functionality and settings
 * and also adding an extra layer of encryption before writing into
 * the phone's keychain
 */
class SecureKeychain {
	isAuthenticating = false;
    static instance: any;

	constructor(code: any) {
		if (!SecureKeychain.instance) {
			privates.set(this, { code });
			SecureKeychain.instance = this;
		}

		return SecureKeychain.instance;
	}

	encryptPassword(password: any) {
		return encryptor.encrypt(privates.get(this).code, { password });
	}

	decryptPassword(str: any) {
		return encryptor.decrypt(privates.get(this).code, str);
	}
}
let instance: any;

export default {
	init(salt: any) {
		console.log(salt);
		instance = new SecureKeychain(salt);

		//if (Device.isAndroid() && Keychain.SECURITY_LEVEL?.SECURE_HARDWARE)
		//AnalyticsV2.trackEvent(AnalyticsV2.ANALYTICS_EVENTS.ANDROID_HARDWARE_KEYSTORE);

		Object.freeze(instance);
		console.log(instance);
		return instance;
	},

	getInstance() {
		return instance;
	},

	getSupportedBiometryType() {
		return Keychain.getSupportedBiometryType();
	},

	async resetGenericPassword() {
		const options = { service: defaultOptions.service };
		await AsyncStorage.removeItem(BIOMETRY_CHOICE);
		await AsyncStorage.removeItem(PASSCODE_CHOICE);
		return Keychain.resetGenericPassword(options);
	},

	async getGenericPassword() {
		if (instance) {
			instance.isAuthenticating = true;
			const keychainObject: any = await Keychain.getGenericPassword(defaultOptions);
			if (keychainObject.password) {
				const encryptedPassword = keychainObject.password;
				const decrypted = await instance.decryptPassword(encryptedPassword);
				keychainObject.password = decrypted.password;
				instance.isAuthenticating = false;
				return keychainObject;
			}
			instance.isAuthenticating = false;
		}
		return null;
	},

	async setGenericPassword(password: any, type: any) {
		const authOptions: any = {
			accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
		};

		if (type === this.TYPES.BIOMETRICS) {
			authOptions.accessControl = Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET;
		} else if (type === this.TYPES.PASSCODE) {
			authOptions.accessControl = Keychain.ACCESS_CONTROL.DEVICE_PASSCODE;
		} else if (type === this.TYPES.REMEMBER_ME) {
			//Don't need to add any parameter
		} else {
			// Setting a password without a type does not save it
			return await this.resetGenericPassword();
		}

		const encryptedPassword = await instance.encryptPassword(password);
		await Keychain.setGenericPassword('metamask-user', encryptedPassword, { ...defaultOptions, ...authOptions });

		if (type === this.TYPES.BIOMETRICS) {
			await AsyncStorage.setItem(BIOMETRY_CHOICE, TRUE);
			await AsyncStorage.setItem(PASSCODE_DISABLED, TRUE);
			await AsyncStorage.removeItem(PASSCODE_CHOICE);
			await AsyncStorage.removeItem(BIOMETRY_CHOICE_DISABLED);

			// If the user enables biometrics, we're trying to read the password
			// immediately so we get the permission prompt
			if (Platform.OS === 'ios') {
				await this.getGenericPassword();
			}
		} else if (type === this.TYPES.PASSCODE) {
			await AsyncStorage.removeItem(BIOMETRY_CHOICE);
			await AsyncStorage.removeItem(PASSCODE_DISABLED);
			await AsyncStorage.setItem(PASSCODE_CHOICE, TRUE);
			await AsyncStorage.setItem(BIOMETRY_CHOICE_DISABLED, TRUE);
		} else if (type === this.TYPES.REMEMBER_ME) {
			await AsyncStorage.removeItem(BIOMETRY_CHOICE);
			await AsyncStorage.setItem(PASSCODE_DISABLED, TRUE);
			await AsyncStorage.removeItem(PASSCODE_CHOICE);
			await AsyncStorage.setItem(BIOMETRY_CHOICE_DISABLED, TRUE);
			//Don't need to add any parameter
		}
	},
	ACCESS_CONTROL: Keychain.ACCESS_CONTROL,
	ACCESSIBLE: Keychain.ACCESSIBLE,
	AUTHENTICATION_TYPE: Keychain.AUTHENTICATION_TYPE,
	TYPES: {
		BIOMETRICS: 'BIOMETRICS',
		PASSCODE: 'PASSCODE',
		REMEMBER_ME: 'REMEMBER_ME',
	},
};