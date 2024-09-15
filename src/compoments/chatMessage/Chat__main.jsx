import { StyleSheet, View, ScrollView, Text,Button } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { format } from 'date-fns';
import MessageCard from './MessageCard';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat__main = ({ messages ,getRecordingLines,clearRecordings}) => {
  const scrollViewRef = useRef();
  const sound = useRef(new Audio.Sound());
  const [recordings, setRecordings] = useState([]);
  const [currentAudio, setCurrentAudio] = useState({});
  const [playbakobject, setPlaybakobject] = useState(null);
  const [soundObject, setSoundObject] = useState(null);

  // Sort messages by date
  const sortedMessages = [...messages].sort((a, b) => new Date(a.date) - new Date(b.date));


  useEffect(() => {
    // Charger les enregistrements précédents depuis AsyncStorage
    const loadRecordings = async () => {
      const savedRecordings = await AsyncStorage.getItem('recordings');
      // const savedRecording = await AsyncStorage.removeItem('recordings');

      if (savedRecordings) {
        setRecordings(JSON.parse(savedRecordings));
        // console.log(savedRecordings)
      }
    };
    loadRecordings();
  }, []);



  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  async function stopSound() {
    try {
      await sound.current.setStatusAsync({ shouldPlay: false });
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  }


  async function stopSound2() {
    try {
      await sound.current.setStatusAsync({ shouldPlay: false });
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  }

  const playRecording = async (uri) => {
    // console.log(uri.toString().replace("file://","."))
// plyin audio for the first time
    if(soundObject===null){

      try {
        // await sound.current.loadAsync({ uri: uri});
        // await sound.current.setStatusAsync({ shouldPlay: true });

        const playbakobject = new Audio.Sound()
      const status = await playbakobject.loadAsync({uri:uri},{shouldPlay:true})
      setPlaybakobject(playbakobject)
      setSoundObject(status)
      setCurrentAudio(uri)
      // console.log(status)
        // stopSound()
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    }
//pause
    if (soundObject.isLoaded && soundObject.isPlaying) {
      const status = await playbakobject.setStatusAsync({shouldPlay:false})
      setSoundObject(status)
    }

    if(soundObject.isLoaded && !soundObject.isPlayin && currentAudio.id === uri.id){
      const status = await playbakobject.playAsync()
      setSoundObject(status)
    }


};


  const renderMessages = () => {
    let lastDate = null;

    return sortedMessages.map((messageData, index) => {
      const showDate = messageData.date && messageData.date !== lastDate;
      lastDate = messageData.date;

      const date = new Date(messageData.date);
      const formattedDate = format(date, 'MMMM dd, yyyy');
      const formattedTime = format(date, 'HH:mm');

      return (
        <View key={index}>
          {showDate && <Text style={styles.dateSeparator}>{formattedDate}</Text>}
          <MessageCard
            message={messageData.message}
            sender={messageData.provenance ? 'user' : 'other'}
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

        <View style={styles.recordingsList}>
        {/* {recordings.map((recordingUri, index) => (
          <View key={index} style={styles.recordingItem}>
            <Text>Enregistrement {index + 1}</Text>
            <Button title="Écouter" onPress={() => playRecording(recordingUri)} />
            <Button title="stop" onPress={() => stopSound2()} />
          </View>
        ))} */}
         {getRecordingLines()}
      </View>
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
