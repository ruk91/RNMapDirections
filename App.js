import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView,{Marker} from 'react-native-maps';
import Polyline from '@mapbox/polyline';

const customStyle = 
  [
    {
      "stylers": [
          {
              "saturation": -100
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#4db8ff"
          }
      ]
  },
  {
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#aadd55"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.local",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },

  ];
export default class RnDirectionsApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: []
    }
  }

  componentDidMount() {
    // find your origin and destination point coordinates and pass it to our method.
    // I am using Bursa,TR -> Istanbul,TR for this example
    this.getDirections("6.9010, 79.8549", "6.8649,79.8997")
  }

  async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        } catch(error) {
            alert(error)
            return error
        }
    }

  render() {
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:6.9010, 
          longitude:79.8549, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        customMapStyle={customStyle}
        >
         {/* Nugegoda */}
         <Marker
            coordinate={{
              title:'Hutch',
              latitude:  6.8649,
              longitude: 79.8997,
              }}
              pinColor='#ec6708'
          />
          {/* Rajagiriya */}
          <Marker
            coordinate={{
              title:'Hutch',
              latitude:  6.9094,
              longitude: 79.8943,
              }}
              pinColor='#ec6708'
          />
          {/* Navala */}
          <Marker
            coordinate={{
              title:'Hutch',
              latitude:  6.8964,
              longitude: 79.8885,
              }}
              pinColor='#ec6708'
          />
          {/* Dehiwala */}
          <Marker
            coordinate={{
              title:'Hutch',
              latitude:  6.8301,
              longitude: 79.8801,
              }}
              pinColor='#ec6708'
          />

          {/* Bambalapitiya */}
          <Marker
            coordinate={{
              title:'Hutch',
              latitude:  6.9010,
              longitude: 79.8549,
              // latitude:  initialRegion.latitude,
              // longitude: initialRegion.longitude,

              }}
              pinColor='#ec6708'
          />


        <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={5}
            strokeColor="#ec6708"
            
            />

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});

AppRegistry.registerComponent('RnDirectionsApp', () => RnDirectionsApp);