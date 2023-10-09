import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import HeaderScreen from "../components/HeaderScreen";
import { GOOGLE_API_KEY } from "../config";

const MapScreen = () => {
  const [location, setLocation] = useState({
    latitude: 21.0200736,
    longitude: 105.7795657,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [destination, setDestination] = useState(null);
  const mapRef = useRef(null);

  const edgePadding = {
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // console.log("location : ", location);
    })();
  }, []);
  const onPlaceSelected = (details) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setDestination(position);
    mapRef.current?.fitToCoordinates([location, position], { edgePadding });
    console.log(">>> check position selected: ", position);
  };
  const onChange = (text) => {
    if (!text) {
      setDestination(null);
    }
  };

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-red-600 flex-1">
      {/* Header */}
      <View className="items-center">
        <HeaderScreen title="Map Screen" />
        <View className="absolute w-11/12 mt-12 z-20">
          <GooglePlacesAutocomplete
            // styles={{ textInput: styles.input }}

            placeholder={"Search ..."}
            fetchDetails
            onPress={(data, details = null) => {
              onPlaceSelected(details);
            }}
            query={{
              key: GOOGLE_API_KEY,
              language: "vi",
              components: "country:vn",
            }}
            onFail={(error) => console.log(error)}
            onNotFound={() => console.log("no results")}
            textInputProps={{
              onChangeText: onChange,
            }}
          />
        </View>
      </View>
      {/* Map area */}
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {destination && <Marker coordinate={destination} />}
        {destination && (
          <MapViewDirections
            origin={location}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#1B74CD"
            strokeWidth={4}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default MapScreen;
