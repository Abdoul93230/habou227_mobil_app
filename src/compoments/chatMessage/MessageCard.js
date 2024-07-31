import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MessageCard = ({ message, sender, timestamp }) => {
  const isUserMessage = sender === 'user';

  return (
    <View style={[styles.card, isUserMessage ? styles.userCard : styles.otherCard]}>
      <Text style={styles.messageText}>{message}</Text>
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
    backgroundColor: '#DCF8C6', // Light green for user messages
    alignSelf: 'flex-end',
  },
  otherCard: {
    backgroundColor: '#FFF', // White for other person's messages
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
