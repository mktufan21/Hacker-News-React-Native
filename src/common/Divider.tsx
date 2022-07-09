import React from 'react';
import {View, StyleSheet} from 'react-native';
const Divider = (): JSX.Element => {
  return <View style={styles.divider} />;
};
const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#45484E',
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;
