import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Chat__header from '../compoments/chatMessage/Chat__header';
import Chat__footer from '../compoments/chatMessage/Chat__footer';
import Chat__main from "../compoments/chatMessage/Chat__main";

const ChatMessage = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How are you?', sender: 'user', date: '2024-07-10' },
    { text: 'I am fine, thank you!', sender: 'other', date: null },
    { text: 'What about you?', sender: 'user', date: null },
    { text: 'I am doing great, thanks!', sender: 'other', date: '2024-07-11' },
    // Add more messages with appropriate dates
  ]);

  const sendMessage = (messageText, sender) => {
    const newMessage = {
      text: messageText,
      sender: sender,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <View style={styles.container}>
      <Chat__header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contenu}>
        <Chat__main messages={messages} />
      </ScrollView>
      <Chat__footer onSendMessage={sendMessage} />
    </View>
  );
}

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF',
  },
  contenu: {
    marginBottom: 100,
  },
});
