import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const wallpaper = require('../assets/images/wallpaper.jpeg');

const LandingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={wallpaper}
        style={styles.imageBackground}
        opacity={0.5}
        resizeMode="cover">
        <TouchableOpacity onPress={() => navigation.navigate('Map')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Welcome to MFN</Text>
          <Text style={styles.subtitle}>
            The easiest way to transport goods in Morocco
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Auth', {screen: 'Login'})}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  skipText: {
    color: '#FFF',
    fontFamily: 'avenir',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 20,
    paddingTop: 20,
    paddingRight: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#000000',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'avenir',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default LandingScreen;
