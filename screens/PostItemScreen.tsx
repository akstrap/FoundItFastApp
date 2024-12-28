import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';

const PostItemScreen: React.FC = ({}) => {
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
    'Books',
    'Toys',
    'Documents',
    'Custom',
  ];

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
    Animated.timing(rotateAnim, {
      toValue: isPickerOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const handleMapPress = (event: {
    nativeEvent: {coordinate: {latitude: any; longitude: any}};
  }) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    setSelectedLocation({latitude, longitude});
    setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Post a Lost or Found Item</Text>

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity onPress={togglePicker} style={styles.pickerToggle}>
          <Text style={styles.pickerText}>
            {category ? category : 'Select a category'}
          </Text>
          <Animated.View style={{transform: [{rotate: rotateInterpolate}]}}>
            <Icon name="arrow-drop-down" size={24} color="gray" />
          </Animated.View>
        </TouchableOpacity>
        {isPickerOpen && (
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={itemValue => {
              setCategory(itemValue);
              setIsPickerOpen(false);
            }}>
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        )}
      </View>

      {category === 'Custom' && (
        <TextInput
          style={styles.input}
          placeholder="Enter custom category"
          value={customCategory}
          onChangeText={setCustomCategory}
        />
      )}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter a description of the item"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the location where you found the item"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Pinpoint Location on Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Post Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  pickerToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 120, // Increased height for the description field
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PostItemScreen;
