import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MapScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Map View of Items</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;