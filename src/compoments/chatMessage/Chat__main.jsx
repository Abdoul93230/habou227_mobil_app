import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import MessageCard from './MessageCard';

const Chat__main = ({ messages }) => {
  // Sort messages by date
  const sortedMessages = [...messages].sort((a, b) => new Date(a.date) - new Date(b.date));

  const renderMessages = () => {
    let lastDate = null;

    return sortedMessages.map((message, index) => {
      // Determine if a new date separator is needed
      const showDate = message.date && message.date !== lastDate;
      lastDate = message.date;

      // Format date and time
      const date = new Date(message.date);
      const formattedDate = format(date, 'MMMM dd, yyyy');
      const formattedTime = format(date, 'HH:mm');

      return (
        <View key={index}>
          {showDate && <Text style={styles.dateSeparator}>{formattedDate}</Text>}
          <MessageCard 
            message={message.text} 
            sender={message.sender} 
            timestamp={formattedTime} 
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatMain}>
        {renderMessages()}
      </ScrollView>
    </View>
  );
};

export default Chat__main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatMain: {
    flex: 1,
  },
  dateSeparator: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
