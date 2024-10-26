import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import MessageCard from './MessageCard';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat__main = ({ messages, getRecordingLines, clearRecordings }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollViewRef = useRef();
  const sound = useRef(new Audio.Sound());
  const [recordings, setRecordings] = useState([]);

  // Sort messages by date
  const sortedMessages = [...messages].sort((a, b) => new Date(a.date) - new Date(b.date));

  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const savedRecordings = await AsyncStorage.getItem('recordings');
        if (savedRecordings) {
          setRecordings(JSON.parse(savedRecordings));
        }
      } catch (error) {
        console.error('Error loading recordings:', error);
      }
    };
    loadRecordings();
  }, []);

  // Gérer le clavier
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(event.endCoordinates.height);
      // Scroll to bottom when keyboard appears
      setTimeout(() => scrollToBottom(true), 100);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
      // Scroll to bottom when keyboard hides
      setTimeout(() => scrollToBottom(true), 100);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  const scrollToBottom = (animated = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated });
    }
  };

  const renderMessages = () => {
    const messagesByDate = {};

    // Organiser les messages par date
    sortedMessages.forEach((messageData) => {
      const date = new Date(messageData.date);
      const formattedDate = format(date, 'MMMM dd, yyyy');

      if (!messagesByDate[formattedDate]) {
        messagesByDate[formattedDate] = [];
      }

      messagesByDate[formattedDate].push(messageData);
    });

    return Object.keys(messagesByDate).map((dateKey, index) => (
      <View key={index}>
        <Text style={styles.dateSeparator}>{dateKey}</Text>
        {messagesByDate[dateKey].map((messageData, msgIndex) => {
          const time = format(new Date(messageData.date), 'HH:mm');
          return (
            <MessageCard
              key={msgIndex}
              message={messageData.message}
              sender={messageData.provenance ? 'user' : 'other'}
              timestamp={time}
            />
          );
        })}
      </View>
    ));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={keyboardOffset}
    >
      <ScrollView
        style={styles.chatMain}
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollToBottom(true)}
        onLayout={() => scrollToBottom(false)}
      >
        {renderMessages()}
        <View style={styles.recordingsList}>
          {/* {getRecordingLines()} */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
  recordingsList: {
    // Ajoutez ici les styles pour la liste des enregistrements si nécessaire
  },
});

export default Chat__main;
