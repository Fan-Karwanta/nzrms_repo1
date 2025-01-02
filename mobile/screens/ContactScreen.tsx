import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Circle, Polyline } from 'react-native-maps';
import { MapType } from 'react-native-maps';
  
import { markers } from '../assets/markers';
import i18n from '@/lang/i18n';
import * as UserService from '@/services/UserService';
import Layout from '@/components/Layout';

const ContactScreen = ({ navigation, route }: NativeStackScreenProps<StackParams, 'Contact'>) => {
  const isFocused = useIsFocused();
  const [reload, setReload] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clusters, setClusters] = useState<any[]>([]);

  const [mapType, setMapType] = useState<MapType>('standard');
  const [searchRadius, setSearchRadius] = useState<number>(1); // km
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [nearbyLocations, setNearbyLocations] = useState<any[]>([]);
  const [showingDistance, setShowingDistance] = useState(false);
  const [distanceLine, setDistanceLine] = useState<any>(null);

  const _init = async () => {
    setVisible(false);
    const language = await UserService.getLanguage();
    i18n.locale = language;
    calculateClusters();
    setVisible(true);
  };

  useEffect(() => {
    if (isFocused) {
      _init();
      setReload(true);
    } else {
      setVisible(false);
    }
  }, [route.params, isFocused]);

  const onLoad = () => {
    setReload(false);
  };

  const INITIAL_REGION = {
    latitude: 12.8797,
    longitude: 121.774,
    latitudeDelta: 15,
    longitudeDelta: 12,
  };

  const mapRef = useRef<MapView>(null);

  const calculateClusters = () => {
    const gridSize = 2;
    const clusters: { [key: string]: { count: number; lat: number; lng: number } } = {};

    markers.forEach(marker => {
      const gridX = Math.floor(marker.longitude / gridSize);
      const gridY = Math.floor(marker.latitude / gridSize);
      const key = `${gridX}-${gridY}`;

      if (!clusters[key]) {
        clusters[key] = {
          count: 1,
          lat: marker.latitude,
          lng: marker.longitude,
        };
      } else {
        clusters[key].count++;
        clusters[key].lat = (clusters[key].lat * (clusters[key].count - 1) + marker.latitude) / clusters[key].count;
        clusters[key].lng = (clusters[key].lng * (clusters[key].count - 1) + marker.longitude) / clusters[key].count;
      }
    });

    setClusters(Object.values(clusters));
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleCalloutPress = (marker: any) => {
    setSelectedLocation(marker);
    const nearby = markers
      .filter(m => m !== marker)
      .map(m => ({
        ...m,
        distance: calculateDistance(
          marker.latitude,
          marker.longitude,
          m.latitude,
          m.longitude
        )
      }))
      .filter(m => m.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance);
    
    setNearbyLocations(nearby);

    mapRef.current?.animateToRegion({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
  };

  const getClusterColor = (count: number) => {
    if (count > 10) return 'rgba(255, 0, 0, 0.2)';
    if (count > 5) return 'rgba(255, 165, 0, 0.2)';
    return 'rgba(0, 255, 0, 0.2)';
  };

  const toggleDistanceMeasurement = (marker: any) => {
    if (showingDistance && selectedLocation) {
      setDistanceLine({
        start: { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude },
        end: { latitude: marker.latitude, longitude: marker.longitude },
        distance: calculateDistance(
          selectedLocation.latitude,
          selectedLocation.longitude,
          marker.latitude,
          marker.longitude
        )
      });
    }
  };

  return (
    <Layout style={styles.master} navigation={navigation} route={route} onLoad={onLoad} reload={reload}>
      {visible && (
        <View style={styles.master}>
          <View style={styles.controlPanel}>
            <TouchableOpacity
              style={[styles.mapButton, mapType === 'standard' && styles.activeButton]}
              onPress={() => setMapType('standard')}
            >
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mapButton, mapType === 'satellite' && styles.activeButton]}
              onPress={() => setMapType('satellite')}
            >
              <Text style={styles.buttonText}>Satellite</Text>
            </TouchableOpacity>
            {/*
            <TouchableOpacity
              style={[styles.mapButton, showingDistance && styles.activeButton]}
              onPress={() => setShowingDistance(!showingDistance)}
            >
              <Text style={styles.buttonText}>Measure</Text>
            </TouchableOpacity> */}
          </View>
{/*
          <View style={styles.radiusContainer}>
            <Text style={styles.radiusLabel}>Search Radius (km):</Text>
            <TextInput
              style={styles.radiusInput}
              value={searchRadius.toString()}
              onChangeText={(text) => setSearchRadius(Number(text) || 1)}
              keyboardType="numeric"
            />
          </View> */}

          <View style={styles.container}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={INITIAL_REGION}
              mapType={mapType}
              showsUserLocation
              showsMyLocationButton
              showsCompass
              showsScale
              ref={mapRef}
            >
              {clusters.map((cluster, index) => (
                <Circle
                  key={`cluster-${index}`}
                  center={{
                    latitude: cluster.lat,
                    longitude: cluster.lng,
                  }}
                  radius={20000}
                  fillColor={getClusterColor(cluster.count)}
                  strokeWidth={0}
                />
              ))}
              
              {selectedLocation && (
                <Circle
                  center={{
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                  }}
                  radius={searchRadius * 1000}
                  fillColor="rgba(0, 128, 255, 0.1)"
                  strokeColor="rgba(0, 128, 255, 0.5)"
                  strokeWidth={1}
                />
              )}

              {distanceLine && (
                <Polyline
                  coordinates={[distanceLine.start, distanceLine.end]}
                  strokeColor="#000"
                  strokeWidth={2}
                  lineDashPattern={[5, 5]}
                />
              )}
              
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={marker}
                  onPress={() => toggleDistanceMeasurement(marker)}
                  onCalloutPress={() => handleCalloutPress(marker)}
                >
                  <Callout tooltip>
                    <View style={styles.calloutContainer}>
                      <Text style={styles.calloutTitle}>{marker.name}</Text>
                      {distanceLine && marker === selectedLocation && (
                        <Text style={styles.calloutDistance}>
                          Distance: {distanceLine.distance.toFixed(2)} km
                        </Text>
                      )}
                      <Text style={styles.calloutHint}>Tap to see nearby properties</Text>
                    </View>
                  </Callout>
                </Marker>
              ))}
            </MapView>

            {selectedLocation && nearbyLocations.length > 0 && (
              <View style={styles.nearbyPanel}>
                <Text style={styles.nearbyTitle}>Nearby Properties ({nearbyLocations.length})</Text>
                <ScrollView style={styles.nearbyList}>
                  {nearbyLocations.map((location, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.nearbyItem}
                      onPress={() => handleCalloutPress(location)}
                    >
                      <Text style={styles.nearbyName}>{location.name}</Text>
                      <Text style={styles.nearbyDistance}>{location.distance.toFixed(2)} km away</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  master: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  mapButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  radiusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  radiusLabel: {
    fontSize: 14,
    marginRight: 10,
  },
  radiusInput: {
    width: 50,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 5,
    textAlign: 'center',
  },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    minWidth: 150,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  calloutHint: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  nearbyPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    maxHeight: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
  nearbyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nearbyList: {
    maxHeight: 150,
  },
  nearbyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nearbyName: {
    fontSize: 14,
    fontWeight: '500',
  },
  nearbyDistance: {
    fontSize: 12,
    color: '#666',
  },
});

export default ContactScreen;