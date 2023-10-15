import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Vote() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>안녕하세요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Vote;
