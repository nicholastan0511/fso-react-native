import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const token = await AsyncStorage.getItem(
      `${this.namespace}:user`
    )

    return token ? JSON.parse(token) : ''
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    await AsyncStorage.setItem(
      `${this.namespace}:user`,
      JSON.stringify(accessToken)
    )
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(
      `${this.namespace}:user`
    )
  }
}

export default AuthStorage;