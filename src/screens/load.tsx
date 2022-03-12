import React from 'react';
import { View, Text } from 'react-native';
import { container } from '../style/container';
import { text } from '../style/text';

export const Load = () => {
  return (
      <View 
        style={container.loadingContainer}>
        <Text
          style={text.logoText}>
            ORBYT
        </Text>
      </View>
  );
};
