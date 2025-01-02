import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as movininTypes from ':movinin-types';

interface MapProps {
  position?: {
    latitude: number;
    longitude: number;
  };
  initialZoom?: number;
  locations?: movininTypes.Location[];
  onSelectLocation?: (locationId: string) => void;
}

const Map = ({
  position = { latitude: 31.792305849269, longitude: -7.080168000000015 },
  initialZoom = 5.5,
  locations = [],
  onSelectLocation,
}: MapProps) => {
  // Convert zoom level to region delta
  const getRegionFromZoom = (zoom: number) => {
    const latitudeDelta = 180 / Math.pow(2, zoom);
    const longitudeDelta = latitudeDelta * 1.5;
    return {
      latitudeDelta,
      longitudeDelta,
    };
  };

  const { latitudeDelta, longitudeDelta } = getRegionFromZoom(initialZoom);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          ...getRegionFromZoom(initialZoom),
        }}
      >
        {locations?.map((location) => (
          location.latitude && location.longitude ? (
            <Marker
              key={location._id}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              onPress={() => onSelectLocation?.(location._id)}
            >
              {/* Custom Marker View if needed */}
              <View style={styles.markerContainer}>
                <Text style={styles.markerText}>{location.name}</Text>
              </View>
            </Marker>
          ) : null
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  markerText: {
    fontSize: 12,
  },
});

export default Map;