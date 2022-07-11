import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {useFetchItemById} from './Service/useFetchItemById';
import {rootStyles} from './styles';
import EmptyView from './common/EmptyView';

const ignoredStyles = ['fontFamily'];
interface Props {
  id: string;
}
export const CommentView = (props: Props): JSX.Element => {
  const {id} = props;
  //get comment details by id
  const query = useFetchItemById(id);
  const [isExpanded, setIsExpanded] = useState(false);
  const comment = query.data;
  const sourceData = useMemo(
    () => ({
      html: comment && 'text' in comment ? comment.text : null,
    }),
    [comment],
  );

  if (!query.isSuccess || !comment) {
    return <EmptyView />;
  }
  return sourceData.html ? (
    <TouchableOpacity
      style={[styles.commentContainer, isExpanded && styles.expandedContainer]}
      onPress={() => {
        setIsExpanded(!isExpanded);
      }}>
      <RenderHTML
        ignoredStyles={ignoredStyles}
        key={comment.id}
        contentWidth={50}
        source={sourceData}
        baseStyle={styles.html}
      />
      {comment.kids?.length && (
        <Text style={styles.replyText}>{`${!isExpanded ? '[+]' : '[-]'} ${
          comment.kids?.length || 0
        } ${
          (comment.kids?.length || 0) > 1 || !comment.kids?.length
            ? 'Reply'
            : 'Reply'
        }  `}</Text>
      )}
      {isExpanded &&
        comment.kids &&
        comment.kids.map(id => (
          <View style={styles.childComment}>
            <CommentView id={id} key={id} />
          </View>
        ))}
    </TouchableOpacity>
  ) : (
    <EmptyView />
  );
};

const styles = StyleSheet.create({
  html: {...rootStyles.text, fontSize: 14, color: '#000000'},
  commentContainer: {
    borderBottomColor: '#45484E' || '#181B24',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 8,
    paddingLeft: 6,
  },
  replyText: {
    color: '#687686',
  },
  childComment: {
    marginLeft: 8,
  },
  expandedContainer: {
    borderLeftColor: '#323843',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});
