import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Linking,
  Share,
  Alert,
} from 'react-native';
import {rootStyles} from '../styles';
import {useFetchItemById} from '../Service/useFetchItemById';
import urlParse from 'url-parse';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EmptyView from './EmptyView';
import Feather from 'react-native-vector-icons/Feather';
import {Story} from '../Service/types';
import {TestIDs} from '../Utils/testIds';
interface Props {
  onListItemPress: CallableFunction;
  id: string;
}
const HeadlineViewFunctional = (props: Props): JSX.Element => {
  const {id, onListItemPress} = props;
  //get story details by id
  const query = useFetchItemById(id);
  //call for share to 3rd party apps
  const onSharePress = async (storyDetails: Story) => {
    try {
      await Share.share({
        title: 'Please check this out.',
        message: storyDetails.title,
        url: storyDetails.url,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  //call for open an URL
  const openLink = (url: string) => {
    Linking.openURL(url);
  };
  //return empty view when api failed
  if (!query.isSuccess && !query.data) {
    return <EmptyView />;
  }
  const story: Story = query.data;
  return (
    <View>
      <TouchableOpacity
        onPress={(): void => onListItemPress()}
        style={styles.container}
        testID={TestIDs.HEADLINE_VIEW_LIST_ID + story.id}>
        <View style={styles.row}>
          <Text style={[styles.title, styles.titleBold]}>{story.title}</Text>
          {story.url && (
            <TouchableOpacity
              testID={TestIDs.HEADLINE_VIEW_LIST_ID_OPEN_URL + story.id}
              onPress={(): void => openLink(story.url)}>
              <Text style={styles.domain}>
                {`(${new urlParse(story.url).hostname})`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.horizontalRow}>
          <Text style={styles.authorName}>{'by @' + story.by}</Text>
          <View style={styles.timeAgoContainer}>
            <Text style={styles.timeAgo}>
              {moment(story.time * 1000).fromNow()}
            </Text>
          </View>
        </View>
        <View style={styles.rowBottomContainer}>
          <Icon name="arrow-up" size={16} color="#000000" />
          <Text style={styles.numPoints}>{story.score} pts</Text>
          <Icon name="comment" size={16} color="#000000" />
          <Text style={styles.numComments}>{story.descendants}</Text>
          <TouchableOpacity
            testID={TestIDs.HEADLINE_VIEW_LIST_SHARE + story.id}
            onPress={() => onSharePress(story)}
            style={styles.numComments}>
            <Feather name="share-2" size={16} color="#000000" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    ...rootStyles.text,
    fontSize: 17,
    color: '#000000',
  },
  titleBold: {
    fontWeight: '600',
  },
  numComments: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#000000',
    marginLeft: 3,
  },
  authorName: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#000000',
  },
  timeAgo: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#000000',
    textAlign: 'right',
  },
  timeAgoContainer: {
    position: 'absolute',
    right: 0,
  },
  numPoints: {
    ...rootStyles.text,
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
    color: 'red',
  },
  divider: {
    ...rootStyles.text,
    fontSize: 12,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  rowBottomContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  horizontalRow: {
    flexDirection: 'row',
    flex: 1,
  },

  domain: {
    marginLeft: 4,
    color: '#0000EE',
  },
});
const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  return prevProps.id === nextProps.id;
};

export const HeadlineView = React.memo(HeadlineViewFunctional, areEqual);
