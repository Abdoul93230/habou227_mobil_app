import { StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { format } from 'date-fns';
import MessageCard from './MessageCard';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat__main = ({ messages, getRecordingLines, clearRecordings }) => {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const scrollViewRef = useRef();
  const sound = useRef(new Audio.Sound());
  const [recordings, setRecordings] = useState([]);

  const [contentHeight, setContentHeight] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

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

  // Gérer le clavier pour éviter qu'il ne recouvre l'interface
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardOffset(event.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOffset(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollViewRef.current && contentHeight > scrollViewHeight) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [contentHeight, scrollViewHeight]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, scrollToBottom]);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setContentHeight(contentHeight);
    scrollToBottom();
  };

  const handleLayout = (event) => {
    setScrollViewHeight(event.nativeEvent.layout.height);
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
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        keyboardShouldPersistTaps="handled"
      >
        {renderMessages()}
        <View style={styles.recordingsList}>
          {getRecordingLines()}
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