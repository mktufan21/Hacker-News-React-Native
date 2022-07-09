import React from 'react';
import {HeadlineView} from './common/HeadlineView';
import {FlatList, StyleSheet, View} from 'react-native';
import {take} from 'lodash';
import {ROUTE_NAMES} from './Utils/constants';
import Divider from './common/Divider';
import EmptyView from './common/EmptyView';
import {TestIDs} from './Utils/testIds';
import {useFetchAllTopStories} from './Service/useFetchAllTopStories';
interface Props {
  navigation: any;
}
const HeadLineScreen = (props: Props): JSX.Element => {
  const {navigation} = props;
  //get all the top stories from API
  const {data, isError} = useFetchAllTopStories();
  if (isError) {
    return <EmptyView />;
  }

  // take the first 100 item
  const topIds = take(data, 100);
  const onViewComments = (id: string) => {
    navigation.push(ROUTE_NAMES.COMMENT_SCREEN, {
      itemId: id,
    });
  };
  return (
    <View testID={TestIDs.HEADLINE_VIEW_CONTAINER}>
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        style={[styles.headLinesView]}
        data={topIds}
        testID={TestIDs.TOP_STORIES_LIST}
        ItemSeparatorComponent={(): JSX.Element => <Divider />}
        renderItem={({item}): JSX.Element => (
          <HeadlineView
            id={item}
            onListItemPress={() => onViewComments(item)}
          />
        )}
        keyExtractor={item => `${item}`}
        windowSize={50}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headLinesView: {
    backgroundColor: '#FFFFFF',
  },
  headline: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
});
export default HeadLineScreen;
