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
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {images, SIZES, COLORS} from '../constants';

import {useMutation} from 'react-query';
import {register} from '../utils/service';

import {CredentialsContext} from '../components/CredentialsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation, route}) => {
  //context
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState(null);

  const {mutate, isLoading, error} = useMutation(register, {
    onSuccess: data => {
      persistLogin(data);
      // navigation.navigate('UserMap');
      // Alert.alert('Success', 'You have successfully registered');
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

  const handleSelectLocation = () => {
    // navigate to MapScreen and pass handleLocationSelect as a prop
    navigation.navigate('Map', {handleLocationSelect});
  };

  const handleLocationSelect = selectedLocation => {
    // update location state with selected location
    setLocation(selectedLocation);
  };

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
                flex: 2,
                paddingHorizontal: 20,
                paddingVertical: 30,
                marginBottom: -10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
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
                    placeholder="email"
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
                    placeholder="password"
                    placeholderTextColor={COLORS.black}
                    secureTextEntry={true}
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
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View style={styles.textBoxSign}>
                  <Image
                    source={images.company}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 20,
                      top: 10,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <TextInput
                    placeholder="company"
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => setCompanyName(text)}
                    value={companyName}
                    style={{
                      flex: 1,
                      height: 40.5,
                      fontSize: 15,
                      marginLeft: 5,
                      color: COLORS.black,
                    }}
                  />
                </View>
                <View style={styles.textBoxSign}>
                  <Image
                    source={images.address}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 20,
                      top: 10,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <TextInput
                    placeholder="address"
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => setAddress(text)}
                    value={address}
                    style={{
                      flex: 1,
                      height: 40.5,
                      fontSize: 15,
                      marginLeft: 5,
                      color: COLORS.black,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View style={styles.textBoxSign}>
                  <Image
                    source={images.phone}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 20,
                      top: 10,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <TextInput
                    placeholder="phone"
                    placeholderTextColor={COLORS.black}
                    onChangeText={text => setPhone(text)}
                    value={phone}
                    style={{
                      flex: 1,
                      height: 40.5,
                      fontSize: 15,
                      marginLeft: 5,
                      color: COLORS.black,
                    }}
                  />
                </View>
                <View style={styles.textBoxSign}>
                  <Image
                    source={images.location}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 20,
                      top: 10,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <TouchableOpacity onPress={handleSelectLocation}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 10,
                      }}>
                      {location ? (
                        <>
                          <Text style={{color: '#4632A1', fontWeight: 'bold'}}>
                            Done !
                          </Text>
                        </>
                      ) : (
                        <Text style={{color: '#4632A1', fontWeight: 'bold'}}>
                          Localisation
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
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
                onPress={() =>
                  mutate({
                    email,
                    password,
                    companyName,
                    address,
                    phone,
                    location,
                  })
                }>
                <View>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignSelf: 'center',
                      color: COLORS.white,
                      fontSize: 25,
                    }}>
                    Sign Up
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
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
                    Already have an account?{' '}
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                      onPress={() =>
                        navigation.navigate('Auth', {screen: 'Login'})
                      }>
                      Sign In
                    </Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
    width: 170,
  },
});
