import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accesToken = await AsyncStorage.getItem(
      `${this.namespace}:token`
    );

    return accesToken;

  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:token`,
      accessToken
    );
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:token`)
  }
}

export default AuthStorage;