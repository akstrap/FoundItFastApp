import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const LoginScreen: React.FC = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Text style={styles.logo}>Found It Fast</Text>
      <Text style={styles.subtitle}>
        the go to marketplace for lost and found items
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust this to match the design
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6F61', // Adjust the color as per the design
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#DDE4E0', // Adjust button background color
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Text color
  },
});

export default LoginScreen;
