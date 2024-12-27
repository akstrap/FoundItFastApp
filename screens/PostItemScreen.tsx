import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const PostItemScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Post a Lost or Found Item</Text>
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

export default PostItemScreen;
