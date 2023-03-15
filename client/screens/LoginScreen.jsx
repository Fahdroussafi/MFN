import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {images, SIZES, COLORS} from '../constants';

import {useMutation} from 'react-query';
import {login} from '../utils/service';

import {CredentialsContext} from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  //context
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const [data, setData] = useState({
    password: '',
    checkTextInputChange: false,
    secureTextEntry: true,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {mutate, isLoading, error} = useMutation(login, {
    onSuccess: data => {
      persistLogin(data);
    },
    onError: error => {
      Alert.alert('Error', error.response.data.message);
    },
    isLoading: setTimeout(() => {
      return isLoading;
    }, 5000),
  });

  const persistLogin = async data => {
    AsyncStorage.setItem('token', JSON.stringify(data.token))
      .then(() => {
        setStoredCredentials(data.token);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // replaces password text with * on active
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  console.log('storedCredentials', storedCredentials);

  return (
    <ImageBackground
      source={images.wallpaper}
      resizeMode="cover"
      opacity={0.7}
      style={{
        flex: 1,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
      }}
      op>
      <SafeAreaView>
        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{
                  height: 250,
                  width: 500,
                }}
              />
            </View>
            <View
              style={{
                flex: 3,
                paddingHorizontal: 20,
                paddingVertical: 30,
                marginBottom: -10,
              }}>
              <View style={styles.textBoxSign}>
                <Image
                  source={images.person}
                  resizeMode="contain"
                  style={{
                    width: 26,
                    height: 40,
                    right: 2,
                    alignSelf: 'flex-start',
                  }}
                />
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.black}
                  onChangeText={text => setEmail(text)}
                  value={email}
                  autoCapitalize={'none'}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 2,
                    color: COLORS.black,
                  }}
                />
              </View>

              <View style={styles.textBoxSign}>
                <Image
                  source={images.lock}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 20,
                    top: 10,
                    alignSelf: 'flex-start',
                  }}
                />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={data.secureTextEntry ? true : false}
                  onChangeText={text => setPassword(text)}
                  value={password}
                  style={{
                    flex: 1,
                    height: 40.5,
                    fontSize: 15,
                    marginLeft: 5,
                    color: COLORS.black,
                  }}
                />
                <TouchableOpacity
                  onPress={updateSecureTextEntry}
                  style={{alignItems: 'flex-end'}}>
                  {data.secureTextEntry ? (
                    <Image
                      source={images.eyeclosed}
                      resizeMode="contain"
                      style={{width: 25, height: 40}}
                    />
                  ) : (
                    <Image
                      source={images.eye}
                      resizeMode="contain"
                      style={{width: 25, height: 40}}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 55,
                  marginHorizontal: 30,
                  marginTop: 40,
                  marginBottom: -20,
                  paddingHorizontal: SIZES.radius,
                  borderRadius: 50,
                  backgroundColor: '#000',
                  ...styles.shadow,
                }}
                onPress={() => {
                  mutate({email, password});
                }}>
                <View>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      color: COLORS.white,
                      fontSize: 25,
                    }}>
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 40,
                  marginBottom: -20,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  height: 45,
                  width: 270,
                  borderRadius: 50,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 13,
                    textAlign: 'center',
                  }}>
                  Don't have an account?{' '}
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    onPress={() =>
                      navigation.navigate('Auth', {screen: 'Register'})
                    }>
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  textBoxSign: {
    flexDirection: 'row',
    height: 45,
    marginHorizontal: 5,
    marginTop: 20,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    elevation: 2,
  },
});
