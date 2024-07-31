import { StyleSheet, View, ScrollView, Text } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import MessageCard from './MessageCard';

const Chat__main = ({ messages }) => {
  const scrollViewRef = useRef();

  // Sort messages by date
  const sortedMessages = [...messages].sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

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
      <ScrollView 
        style={styles.chatMain}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
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
    marginBottom: 30,
  },
  dateSeparator: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
