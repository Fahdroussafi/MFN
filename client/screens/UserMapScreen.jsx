import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import Search from '../components/SearchBar';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CredentialsContext} from './../components/CredentialsContext';

const UserMapScreen = ({navigation}) => {
  const [markers, setMarkers] = useState([]);

  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  useEffect(() => {
    async function fetchMarkers() {
      const appUrl = 'http://192.168.9.31:8080';
      const url = `${appUrl}/api/company/getcompanies`;

      const response = await fetch(url);
      const data = await response.json();
      setMarkers(data);
    }
    fetchMarkers();
  }, [markers]);

  const clearLogin = () => {
    AsyncStorage.clear()
      .then(() => {
        setStoredCredentials('');
        navigation.navigate('Landing');
      })
      .catch(error => console.log(error));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Search />
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 32.3123,
            longitude: -9.2311,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          customMapStyle={mapStyle}>
          {markers.map(marker => (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: parseFloat(marker.location.latitude),
                longitude: parseFloat(marker.location.longitude),
              }}
              title={marker.email}
              description={marker.companyName}>
              <Image
                source={require('../assets/images/building.png')}
                style={{height: 35, width: 35}}
              />
            </Marker>
          ))}
        </MapView>
        {storedCredentials ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={clearLogin}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default UserMapScreen;
mapStyle = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}],
  },
];
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: '#000000',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
