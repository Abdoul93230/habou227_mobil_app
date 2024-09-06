import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const MessageCard = ({ message, sender, timestamp }) => {
  const { width } = useWindowDimensions();
  const isUserMessage = sender === 'user';

  return (
    <View style={[styles.card, isUserMessage ? styles.userCard : styles.otherCard]}>
      <RenderHtml
        contentWidth={width}
        source={{ html: message }}
        baseStyle={styles.messageText}
      />
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userCard: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherCard: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left',
    marginTop: 5,
  },
});
