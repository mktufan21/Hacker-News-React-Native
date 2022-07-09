import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {useFetchItemById} from './Service/useFetchItemById';
import {CommentView} from './CommentView';
import {HeadlineView} from './common/HeadlineView';
import EmptyView from './common/EmptyView';
interface Props {
  route: any;
}
const CommentScreen = (props: Props): JSX.Element => {
  const {route} = props;
  const {itemId} = route.params;
  const headlineQuery = useFetchItemById(itemId);
  if (!headlineQuery.isSuccess) {
    return <EmptyView />;
  }
  const headline = headlineQuery.data;
  return (
    <View style={styles.rootView}>
      <ScrollView>
        <HeadlineView id={itemId} onListItemPress={(): void => {}} />
        <View style={styles.commentContainer}>
          {headline?.kids?.map(id => (
            <CommentView id={id} key={id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {marginHorizontal: 2, marginVertical: 4},
  headline: {
    marginHorizontal: 8,
  },
  commentContainer: {paddingHorizontal: 8 * 2, paddingVertical: 4},
});
export default CommentScreen;
