import React from 'react';
import {View} from 'react-native';
import {TestIDs} from '../Utils/testIds';
const EmptyView = (): JSX.Element => {
  return <View testID={TestIDs.EMPTY_VIEW} />;
};
export default EmptyView;
